import { ProjectService } from './../../../../providers/project.service';
import { Project } from './../../../../models/project';
import { FormGroup } from '@angular/forms';
import { TaskPartnerComponent } from './task-partner/task-partner.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskForm } from '../../../../forms/task-form';
import { TaskTagComponent } from './task-tag/task-tag.component';
import { TaskService } from '../../../../providers/task.service';
import { Task } from '../../../../models/task';
import { PartnerService } from '../../../../providers/partner.service';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { EventMessagesService } from '../../../../providers/utils/event-messages.service';
import { AuthenticationService } from '../../../../providers/authentication.service';
import { User } from '../../../../models/user';
import { Mode } from '../../../../config/properties';
declare var SpinModal: any;
declare var $: any;

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements AfterViewInit {


  public task: Task = new Task();
  public bgColor: string;
  public taskForm: TaskForm = new TaskForm();
  private modal = new SpinModal();
  private user = new User();
  public mode = '';

  @ViewChild(TaskDetailComponent) taskDetailChild;
  @ViewChild(TaskPartnerComponent) taskPartnerChild;
  @ViewChild(TaskTagComponent) taskTagChild;

  constructor(private taskService: TaskService,
    private partnerService: PartnerService,
    private utilsService: UtilsService,
    private eventMessageService: EventMessagesService,
    private auth: AuthenticationService,
    private projectService: ProjectService) {
    // Get User
    this.auth.crrUser.subscribe(user => {
      this.user = user;
    });
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit')
    // Get task on stamp
    this.taskService.currentTask.subscribe((task: Task) => {
      console.log(task);
      if (task.taskId || (task.workDate && task.workStartTime && task.workEndTime)) {
        this.onTaskHasSelected(task, Mode.I);
      }
    });

    // Get Task on View or Edit
    this.taskService.currentViewTask.subscribe((task: Task) => {
      if (task.taskId) {
        this.onTaskHasSelected(task, this.user.userId === task.ownerUserId ? Mode.E : Mode.V);
      }
    });
  }

  onTaskHasSelected(task: Task, mode: string) {
    this.mode = mode;
    this.taskForm.task = task;
    this.taskForm.task.color = task.color ? task.color : 'primary';
    this.taskDetailChild.initTaskDetail(this.taskForm.task, this.mode);
    // 
    this.taskPartnerChild.task = this.taskForm.task;
    this.taskPartnerChild.mode = this.mode;
    this.taskPartnerChild.owner = this.user.email;
    this.task.projectId = this.taskForm.task.projectId;

    this.taskTagChild.tagList = [];
    this.taskTagChild.mode = this.mode;

    this.taskTagChild.initialTag(this.taskForm.task.taskId);

    if (this.taskForm.task.projectId) {
      this.taskDetailChild.taskDetailFormGroup.patchValue({ taskDetailTopic: this.taskForm.task.topic });
      this.taskDetailChild.taskDetailFormGroup.patchValue({ taskDetailActivity: this.taskForm.task.activity });
      this.taskDetailChild.statusFlag = (this.taskForm.task.statusFlag == 'I' ? false : true);
      this.selectedProject(this.taskForm.task.projectId);
      this.mode = Mode.E;
    }
    if (this.mode == Mode.V) {
      console.log('View');
    }
  }

  selectedProject(prjId: number) {
    this.projectService.findProjectById(prjId).subscribe(
      project => {
        if (project) {
          this.taskService.selectedProjectId.next(project.projectId);
          this.taskDetailChild.taskDetailFormGroup.patchValue({ taskDetailProject: project.projectName });
        }
      }
    )
  }

  onSubmit() {
    if (this.taskDetailChild.taskDetailFormGroup.valid) {
      this.task.statusFlag = (this.taskDetailChild.taskDetailFormGroup.value.taskDetailStatusFlag == true ? 'D' : 'I');
      this.task.activity = this.taskDetailChild.taskDetailFormGroup.value.taskDetailActivity;
      this.task.color = this.taskDetailChild.taskObj.color;
      this.task.doSelfFlag = (this.taskPartnerChild.doSelfFlag == true ? 'Y' : 'N');
      this.task.topic = this.taskDetailChild.taskDetailFormGroup.value.taskDetailTopic;
      this.task.projectId = this.taskDetailChild.projectId;
      this.task.ownerUserId = this.user.userId;
      this.task.activeFlag = 'A';
      this.task.workDate = this.utilsService.convertDatePickerToThDate(this.taskDetailChild.taskDetailFormGroup.value.taskDetailWorkDate);
      this.task.workStartTime = this.utilsService.convertTimeToDb(this.taskDetailChild.taskDetailFormGroup.value.taskDetailStartTime);
      this.task.workEndTime = this.utilsService.convertTimeToDb(this.taskDetailChild.taskDetailFormGroup.value.taskDetailEndTime);
      this.task.taskPartnerList = [];
      let stampDate = this.task.workDate;
      for (let obj of this.taskPartnerChild.taskMember) {
        if (obj.status == true) {
          this.task.taskPartnerList.push({ id: { userId: obj.userId } });
        }
      }
      if (this.taskPartnerChild.taskPartner) {
        for (let obj of this.taskPartnerChild.taskPartner) {
          this.task.taskPartnerList.push({ id: { userId: obj.userId } });
        }
      }
      for (let obj of this.taskTagChild.tagList) {
        this.task.taskTagList.push({ tag: { tagName: obj['display'] } });
      }

      if (this.mode == Mode.E) {
        this.task.taskId = this.taskForm.task.taskId;
        this.task.versionId = this.taskForm.task.versionId;
        console.log('updateTask: ', this.task);
        this.updateTask(this.task);
      } else {
        console.log('insertTask: ', this.task);
        this.createNewTask(this.task);
      }
      let self = this;
      $('#task-modal').on("hidden.bs.modal", function () {
        $('.timestamp .ui-selected').removeClass('ui-selected');
        self.taskService.changeTimetableDate(self.utilsService.convertThDateToEn(stampDate));
      })
    }
  }

  createNewTask(task: Task) {
    this.taskService.insertTask(task).subscribe(
      res => {
        console.log(res)
        this.eventMessageService.onSuccess();
        this.oncloseModal();
      },
      error => {
        console.log(error)
      }
    );
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe(
      res => {
        console.log(res);
        this.eventMessageService.onSuccess();
        this.oncloseModal();
      }, error => {
        console.log(error);
      }
    )
  }

  oncloseModal() {
    this.modal.close('#task-modal');
    this.task = new Task;
  }

  receiveMessage(event) {
    this.bgColor = event;
  }

  deleteTask() {
    if (this.taskForm.task.taskId) {
      this.taskService.removeTask(this.taskForm.task.taskId).subscribe(
        res => {
          console.log(res);
        }, error => {
          console.log(error)
        }, () => {
          this.oncloseModal();
        }
      )
    }
  }
}
