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

  public task: Task = new Task();
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
    if (this.taskDetailChild.taskDetailFormGroup.valid) {
      this.task.statusFlag = (this.taskDetailChild.taskDetailFormGroup.value.taskDetailStatusFlag == true ? 'D' : 'I');
      this.task.activity = this.taskDetailChild.taskDetailFormGroup.value.taskDetailActivity;
      this.task.color = this.taskDetailChild.taskObj.color;
      this.task.doSelfFlag = (this.taskPartnerChild.doSelfFlag == true ? 'Y' : 'N');
      this.task.topic = this.taskDetailChild.taskDetailFormGroup.value.taskDetailTopic;
      this.task.projectId = this.taskDetailChild.projectId;
      this.task.ownerUserId = 'tiwakorn.ja';
      this.task.workDate = this.utilsService.convertDatePickerToThDate(this.taskDetailChild.taskDetailFormGroup.value.taskDetailWorkDate);
      this.task.workStartTime = this.utilsService.convertTimeToDb(this.taskDetailChild.taskDetailFormGroup.value.taskDetailStartTime);
      this.task.workEndTime = this.utilsService.convertTimeToDb(this.taskDetailChild.taskDetailFormGroup.value.taskDetailEndTime);
      this.task.taskPartnerList = [];
      for (let obj of this.taskPartnerChild.taskMember) {
        if (obj.status == true) {
          this.task.taskPartnerList.push({ id: { userId: obj.user.userId } });
        }
      }
      // for (let obj of this.taskForm.taskPartner) {
      //   this.taskForm.task.taskPartnerList.push({ id: { userId: obj.userId } });
      // }
      for (let obj of this.taskTagChild.tagList) {
        this.task.taskTagList.push({ tag: { tagName: obj['display'] } });
      }
      console.log(this.task)
      this.createNewTask(this.task);
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

  oncloseModal() {
    this.modal.close('#task-modal');
    this.task = new Task;
  }

  receiveMessage(event) {
    this.bgColor = event;
  }
}
