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
  private owner: String;
  public catagoryList: any[];

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
    this.getCatagory();
    this.taskService.currentTask.subscribe((task: Task) => {
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

    this.task = new Task();
    const temp = Object.assign({}, task);
    this.taskForm.task = temp;
    this.mode = mode;
    this.owner = task.ownerUserId;
    const objTask = this.taskForm.task;
    objTask.color = (task.color ? task.color : 'l-blue');
    this.checkProjectId(this.taskForm.task.projectId);
    this.taskDetailChild.initTaskDetail(objTask, this.mode);
    this.taskPartnerChild.mode = this.mode;
    this.taskPartnerChild.initTaskPartner(this.taskForm.task.taskId, this.user,  this.owner);
    this.taskTagChild.mode = this.mode;
    this.taskTagChild.initialTag(this.taskForm.task, this.user.userId);

    //Mode Insert
    if (this.mode == Mode.I) {
      if (this.owner && this.user.userId !== this.owner) {
        this.taskDetailChild.isDisableTopic = true;
        this.taskDetailChild.isDisableProject = true;
        this.taskDetailChild.showFavPrj = false;
        this.taskDetailChild.isDissableCatagory = true;
        this.taskPartnerChild.isHiddenCheckBox = true;
        this.taskPartnerChild.isDisableAddPartner = false;
        this.taskPartnerChild.isHiddenDeletePartner = false;
        this.taskPartnerChild.isDisableDoSelfFlag = true;
        //hide edit partner
      } else {
        this.taskDetailChild.isDisableTopic = false;
        this.taskDetailChild.isDisableProject = false;
        this.taskDetailChild.showFavPrj = true;
        this.taskDetailChild.isDissableCatagory = false;
        this.taskPartnerChild.isHiddenCheckBox = false;
        this.taskPartnerChild.isDisableAddPartner = true;
        this.taskPartnerChild.isHiddenDeletePartner = true;
        this.taskPartnerChild.isDisableDoSelfFlag = false;
        //hide edit partner
      }
    } else if (this.mode == Mode.E) {
      this.taskDetailChild.isDisableProject = true;
      this.taskDetailChild.showFavPrj = false;
      if (this.taskForm.task.referTaskId) {
        this.taskDetailChild.isDisableTopic = true;
        this.taskDetailChild.isDissableCatagory = true;
        this.taskPartnerChild.isHiddenDeletePartner = false;
        this.taskPartnerChild.isHiddenCheckBox = true;
        this.taskPartnerChild.isDisableDoSelfFlag = true;
        this.taskPartnerChild.isDisableAddPartner = true;
      } else {
        this.taskDetailChild.isDisableTopic = false;
        this.taskDetailChild.isDissableCatagory = false;
        this.taskPartnerChild.isHiddenDeletePartner = true;
        this.taskPartnerChild.isHiddenCheckBox = false;
        this.taskPartnerChild.isDisableDoSelfFlag = false;
        this.taskPartnerChild.isDisableAddPartner = false;
      }
    }else{
      this.taskDetailChild.showFavPrj = false;
      this.taskDetailChild.isDisableTopic = true;
      this.taskDetailChild.isDisableProject = true;
      this.taskPartnerChild.isDisableDoSelfFlag = true;
      this.taskPartnerChild.isDisableAddPartner = false;
      this.taskDetailChild.isDissableCatagory = true;
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
    } else {
      this.taskPartnerChild.isHidden = false;
    }
  }

  async getCatagory(){
    this.taskDetailChild.categoryList = await this.taskService.getCatagory().toPromise();
  }

  onSubmit() {
    if (this.taskDetailChild.taskDetailFormGroup.valid) {
      this.utilsService.loader(true);
      this.task.statusFlag = (this.taskDetailChild.taskDetailFormGroup.value.taskDetailStatusFlag == true ? 'D' : 'I');
      this.task.activity = this.taskDetailChild.taskDetailFormGroup.value.taskDetailActivity;
      this.task.color = this.taskDetailChild.taskObj.color;
      this.task.doSelfFlag = (this.taskPartnerChild.doSelfFlag == true ? 'Y' : 'N');
      this.task.topic = this.taskDetailChild.topic;
      this.task.projectId = this.taskDetailChild.projectId;
      this.task.ownerUserId = this.user.userId;
      this.task.activeFlag = 'A';
      this.task.categoryId = this.taskDetailChild.taskDetailFormGroup.value.taskCatagory;
      this.task.workDate = this.utilsService.convertDatePickerToThDate(this.taskDetailChild.taskDetailFormGroup.value.taskDetailWorkDate);
      this.task.workStartTime = this.utilsService.convertTimeToDb(this.taskDetailChild.taskDetailFormGroup.value.taskDetailStartTime);
      this.task.workEndTime = this.utilsService.convertTimeToDb(this.taskDetailChild.taskDetailFormGroup.value.taskDetailEndTime);
      this.task.taskPartnerList = [];

      //check condition for add prjmember on Mode.I
      if (this.mode == Mode.I) {
        //create new task
        if (!this.taskForm.task.taskId) {
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
        }
        //if taskId => copytask not add prjmember
      }
      //mode == Mode.E
      else if (this.mode == Mode.E) {
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
      }

      for (let obj of this.taskTagChild.tagList) {
        if (obj.display) {
          this.task.taskTagList.push({ tag: { tagName: obj.display } });
        } else {
          this.task.taskTagList.push({ tag: { tagName: obj } });
        }
      }
      this.checkRequiredData(this.task, this.mode);
    } else {
      this.utilsService.findInvalidControls(this.taskDetailChild.taskDetailFormGroup);
      this.eventMessageService.onWarning('กรุณาระบุข้อมูลในช่องที่มีเครื่องหมาย * ให้ครบ..')
      this.utilsService.loader(false);
    }
  }

  checkRequiredData(task: Task, mode: string) {
    if (task.doSelfFlag == 'N' && task.taskPartnerList.length == 0) {
      this.eventMessageService.onWarning('กรุณาระบุผู้ร่วมงาน..');
      this.utilsService.loader(false);
    } else {
      if (mode == Mode.I) {
        this.createNewTask(task);
      } else {
        task.referTaskId = this.taskForm.task.referTaskId;
        this.updateTask(task);
      }
    }
    $('#workingDatePicker').datepicker('refresh');
  }

  createNewTask(task: Task) {
    if (this.taskForm.task.ownerUserId !== this.user.userId) {
      task.referTaskId = this.taskForm.task.taskId;
    }
    console.log(task)
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
    if (this.taskForm.task.taskId) {
      task.taskId = this.taskForm.task.taskId;
    }
    if (this.taskForm.task.versionId) {
      task.versionId = this.taskForm.task.versionId;
    }
    console.log(task)
    this.taskService.updateTask(task).subscribe(
      res => {
        console.log(res);
        this.eventMessageService.onUpdateSuccess('');
      }, error => {
        // this.eventMessageService.onUpdateError(error);
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
    let stampEnDate = this.utilsService.convertThDateToEn(stampDate);
    let firstDate = this.utilsService.getStartOfWeek(stampEnDate, true);
    let endDate = this.utilsService.getEndOfWeek(stampEnDate, true);
    this.modal.close('#task-modal');
    this.taskService.changeTimetableDate(stampEnDate);
    let weekDateObj = { start: firstDate, end: endDate };
    this.taskService.changeTimetableDOW(weekDateObj);
    this.taskService.chageSelectedTask(new Task());
    this.onCompleteEmit.emit(stampDate);
    this.task = new Task;
  }

  onDismissModal() {
    this.modal.close('#task-modal');
    this.taskService.chageSelectedTask(new Task());
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
          this.eventMessageService.onDeleteSuccess('');
          // console.log(res);
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
