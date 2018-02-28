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
declare var SpinModal: any;

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {

  public bgColor: string;
  public taskForm: TaskForm = new TaskForm();
  private modal = new SpinModal();

  @ViewChild(TaskDetailComponent) taskDetailChild;
  @ViewChild(TaskPartnerComponent) taskPartnerChild;
  @ViewChild(TaskTagComponent) taskTagChild;

  constructor(private taskService: TaskService,
    private partnerService: PartnerService,
    private utilsService: UtilsService,
    private eventMessageService: EventMessagesService) { }

  onTimestampCommit() {
    this.taskDetailChild.projectObj = new Project();
    this.taskDetailChild.taskObj = new Task();
    this.taskService.currentTask.subscribe(
      (selectedTask: Task) => {
        console.log(selectedTask)
        this.taskForm.task = selectedTask;
        this.taskDetailChild.taskObj = this.taskForm.task;
        this.taskDetailChild.projectObj = this.taskForm.taskProject;
        this.taskDetailChild.initTaskDetail();
      })
  }

  onSubmit() {
    console.log('valid?')
    console.log(this.taskDetailChild.taskDetailFormGroup)
    console.log(this.taskDetailChild.taskDetailFormGroup.valid)
    if (this.taskDetailChild.taskDetailFormGroup.valid) {
      console.log('valid');
      this.taskForm.task.statusFlag = (this.taskDetailChild.taskDetailFormGroup.value.taskDetailStatusFlag == true ? 'D' : 'I');
      this.taskForm.task.activity = this.taskDetailChild.taskDetailFormGroup.value.taskDetailActivity;
      this.taskForm.task.color = this.taskDetailChild.taskObj.color;
      this.taskForm.task.doSelfFlag = (this.taskPartnerChild.doSelfFlag == true ? 'Y' : 'N');
      this.taskForm.task.topic = this.taskDetailChild.taskDetailFormGroup.value.taskDetailTopic;
      this.taskForm.task.projectId = this.taskDetailChild.projectId;
      this.taskForm.task.ownerUserId = 'tiwakorn.ja';
      this.taskForm.task.workDate = this.utilsService.convertDatePickerToThDate(this.taskDetailChild.taskDetailFormGroup.value.taskDetailWorkDate);
      this.taskForm.task.workStartTime = this.utilsService.convertTimeToDb(this.taskDetailChild.taskDetailFormGroup.value.taskDetailStartTime);
      this.taskForm.task.workEndTime = this.utilsService.convertTimeToDb(this.taskDetailChild.taskDetailFormGroup.value.taskDetailEndTime);
      this.taskForm.task.taskPartnerList = [];
      for (let obj of this.taskPartnerChild.taskMember) {
        if (obj.status == true) {
          this.taskForm.task.taskPartnerList.push({ id: { userId: obj.user.userId } });
        }
      }
      // for (let obj of this.taskForm.taskPartner) {
      //   this.taskForm.task.taskPartnerList.push({ id: { userId: obj.userId } });
      // }
      for (let obj of this.taskTagChild.tagList) {
        this.taskForm.task.taskTagList.push({ tag: { tagName: obj['display'] } });
      }
      this.insertTask(this.taskForm.task);
    }
  }

  insertTask(task: Task) {
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

  oncloseModal(){
    this.modal.close('#task-modal');
    this.taskForm.task = new Task;
  }

  receiveMessage(event) {
    this.bgColor = event;
  }
}
