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

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {

  public bgColor: string;
  public taskForm: TaskForm = new TaskForm();

  @ViewChild(TaskDetailComponent) taskDetailChild;
  // @ViewChild(TaskMemberComponent) taskMemberComponent;
  // @ViewChild(TaskTagComponent) taskTagComponent;

  constructor(private taskService: TaskService,
    private partnerService: PartnerService,
    private utilsService: UtilsService) { }

  onTimestampCommit() {
    this.taskService.currentTask.subscribe(
      (selectedTask: Task) => {
        console.log(selectedTask)
        this.taskForm.task = selectedTask
        // Task Detail
        this.taskDetailChild.taskObj = this.taskForm.task;
        this.taskDetailChild.projectObj = this.taskForm.taskProject;
        this.taskDetailChild.initTaskDetail();
      })
  }


  onSubmit() {
    console.log(this.taskDetailChild.taskDetailFormGroup.value);
    console.log(this.taskDetailChild.taskDetailFormGroup.value.color);
    // this.taskForm.task.workDate = this.utilsService.convertDatePickerToThDate(this.taskForm.task.workDate);
    // this.taskForm.task.workStartTime = this.gettime(this.taskForm.task.workStartTime);
    // this.taskForm.task.workEndTime = this.gettime(this.taskForm.task.workEndTime);
    // this.taskForm.task.activeFlag = this.getStatusFlag(this.taskForm.task.activeFlag);
    // this.taskForm.task.statusFlag = this.getStatusFlag(this.taskForm.statusFlag);
    // this.taskForm.task.ownerUserId = "tiwakorn.ja"
    // this.taskForm.task.taskPartnerList = [];
    // console.log(this.taskForm.taskMember)
    // for (let obj of this.taskForm.taskMember) {
    //   if (obj.status == true) {
    //     this.taskForm.task.taskPartnerList.push({ id: { userId: obj.userId } });
    //   }
    // }
    // for (let obj of this.taskForm.taskPartner) {
    //   this.taskForm.task.taskPartnerList.push({ id: { userId: obj.userId } });
    // }
    // for (let obj of this.taskForm.taskTagList) {
    //   this.taskForm.task.taskTagList.push({ tag: { tagName: obj['display'] } });
    // }
    // console.log(this.taskForm.task);
    // this.insertTask(this.taskForm.task);
  }

  insertTask(task: Task) {
    this.taskService.insertTask(this.taskForm.task).subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error)
      }
    );
  }

  getStatusFlag(data) {
    if (data == true) {
      return 'A'
    } else {
      return 'I'
    }
  }

  receiveMessage(event) {
    this.bgColor = event;
  }
}
