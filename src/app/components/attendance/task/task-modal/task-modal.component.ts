import { ProjectService } from './../../../../providers/project.service';
import { Project } from './../../../../models/project';
import { FormGroup } from '@angular/forms';
import { TaskPartnerComponent } from './task-partner/task-partner.component';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';
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
  selector: 'task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements AfterViewInit {

  public task: Task = new Task();
  public bgColor: string;
  public taskForm: TaskForm = new TaskForm();
  private modal = new SpinModal();
  private user: User = new User();
  public mode = '';

  @Output() onCompleteEmit = new EventEmitter<string>();
  @ViewChild(TaskDetailComponent) taskDetailChild;
  @ViewChild(TaskPartnerComponent) taskPartnerChild;
  @ViewChild(TaskTagComponent) taskTagChild;

  constructor(private taskService: TaskService,
    private partnerService: PartnerService,
    private utilsService: UtilsService,
    private eventMessageService: EventMessagesService,
    private auth: AuthenticationService,
    private projectService: ProjectService,
    private elementRef: ElementRef) {
    this.auth.crrUser.subscribe((user: User) => {
      this.user = user;
    });

  }

  ngAfterViewInit() {
    // Get task on stamp

    this.taskService.currentTask.subscribe((task: Task) => {
      // console.log('currentTask=> ', task);
      if (task.taskId || (task.workDate && task.workStartTime && task.workEndTime)) {
        this.onTaskHasSelected(task, Mode.I);
      }
    });
    // Get Task on View or Edit
    this.taskService.currentViewTask.subscribe((task: Task) => {
      // console.log('currentViewTask=> ', task);
      if (task.taskId) {
        this.onTaskHasSelected(task, this.user.userId === task.ownerUserId ? Mode.E : Mode.V);
      }
    });
  }

  onTaskHasSelected(task: Task, mode: string) {
    console.log('onTaskHasSelected | ', mode);
    console.log('task', task);
    const temp = task;
    this.task = new Task();
    this.taskForm.task = temp;
    this.mode = mode;
    this.bgColor = task.color ? task.color : 'blue';
    const objTask = this.taskForm.task;
    objTask.color = (task.color ? task.color : 'blue');
    this.taskDetailChild.initTaskDetail(objTask, this.mode);
    this.checkProjectId(this.taskForm.task.projectId);
    this.taskPartnerChild.initTaskPartner(this.taskForm.task.taskId, this.mode, this.user, task.ownerUserId);
    this.taskTagChild.tagList = [];
    this.taskTagChild.mode = this.mode;
    this.taskTagChild.initialTag(this.taskForm.task.taskId);
    this.taskTagChild.ngOnInit();
  }

  checkTaskId(taskId: number) {
    this.taskDetailChild.copyTask = false;
    if (taskId) {
      this.taskDetailChild.copyTask = true;
    }
  }

  checkProjectId(projectId: number) {
    if (projectId) {
      this.projectService.findProjectById(projectId).subscribe(
        project => {
          this.taskDetailChild.projectId = project.projectId;
          this.taskService.changeProjectId(project.projectId);
        }
      )
    }
  }

  onSubmit() {
    this.utilsService.findInvalidControls(this.taskDetailChild.taskDetailFormGroup);
    if (this.taskDetailChild.taskDetailFormGroup.valid) {
      this.utilsService.loader(true);

      //taskDetail
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

      if (this.taskPartnerChild.doSelfFlag && this.mode == Mode.I && this.task.taskId) {
        this.task.taskPartnerList.push({ id: { userId: this.user.userId } });
      }

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
        this.updateTask(this.task);
      } else if (this.mode == Mode.I) {
        if (this.taskForm.task.taskId) {
          if (this.taskForm.task.referTaskId) {
            this.task.referTaskId = this.taskForm.task.referTaskId;
          } else {
            this.task.referTaskId = this.taskForm.task.taskId;
          }
        }

        if (this.taskPartnerChild.doSelfFlag && this.mode == Mode.I && this.task.taskId === undefined) {
          this.task.taskPartnerList.push({ id: { userId: this.user.userId } });
        }
        this.createNewTask(this.task);
      }
    }
  }

  createNewTask(task: Task) {
    this.taskService.insertTask(task).subscribe(
      res => {
        console.log(res)
        this.eventMessageService.onInsertSuccess('');
      },
      error => {
        this.eventMessageService.onInsertError(error);
        console.log(error);
        this.utilsService.loader(false);
      }, () => {
        this.oncloseModal();
        this.utilsService.loader(false);
      }
    );
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe(
      res => {
        console.log(res);
        this.eventMessageService.onUpdateSuccess('');
      }, error => {
        this.eventMessageService.onUpdateError(error);
        console.log(error);
        this.utilsService.loader(false);
      }, () => {
        this.oncloseModal();
        this.utilsService.loader(false);
      }
    )
  }

  onConfirmModal() {
    let modal = new SpinModal();
    modal.initial('#confirmDeleteTask', { show: true, backdrop: 'true', keyboard: true });

  }

  oncloseModal() {
    let stampDate = this.taskForm.task.workDate;
    this.modal.close('#task-modal');
    this.taskService.changeTimetableDate(this.utilsService.convertThDateToEn(stampDate));
    this.taskService.chageSelectedTask(new Task());
    this.onCompleteEmit.emit(stampDate);
    this.task = new Task;
  }

  receiveMessage(event) {
    this.bgColor = event;
  }

  deleteTask() {
    this.utilsService.loader(true);
    if (this.taskForm.task.taskId) {
      this.taskService.removeTask(this.taskForm.task.taskId).subscribe(
        res => {
          console.log(res);
        }, error => {
          console.log(error);
          this.utilsService.loader(false);
          this.eventMessageService.onCustomError('ไม่สามารถลบข้อมูลได้ ', error.error.description);
        }, () => {
          this.oncloseModal();
          this.utilsService.loader(false);
        }
      )
    }
  }

}
