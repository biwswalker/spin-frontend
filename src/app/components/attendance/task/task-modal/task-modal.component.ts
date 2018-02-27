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

  // @ViewChild(TaskDetailComponent) taskDetailChild;
  // @ViewChild(TaskMemberComponent) taskMemberComponent;
  // @ViewChild(TaskTagComponent) taskTagComponent;

  constructor(private taskService: TaskService,
    private partnerService: PartnerService) { }

  onTimestampCommit() {
    // this.taskService.currentTask.subscribe(
    //   (selectedTask: Task) => {
    //     console.log(selectedTask)
    //     this.taskForm.task = selectedTask
    //     // Task Detail
    //     // this.taskDetailChild.taskObj = this.taskForm.task;
    //     // this.taskDetailChild.projectObj = this.taskForm.taskProject;
    //     // this.taskDetailChild.initTaskDetail();
    //   })
  }

  findAllUser() {
    // this.partnerService.findAllUSer().subscribe(
    //   data => {
    //     if (data) {
    //       console.log(data);
    //       for (let obj of data) {
    //         this.taskForm.autocompletePartnerList.push({ userId: obj.userId, email: obj.email });
    //       }
    //     }
    //   }
    // )
  }

  onSubmit() {
    this.taskForm.task.workDate = this.getDate(this.taskForm.task.workDate);
    this.taskForm.task.workDate = '25610227';
    // this.taskForm.task.projectId = this.taskForm.taskProject.projectId;
    this.taskForm.task.workStartTime = this.gettime(this.taskForm.task.workStartTime);
    this.taskForm.task.workEndTime = this.gettime(this.taskForm.task.workEndTime);
    this.taskForm.task.activeFlag = this.getStatusFlag(this.taskForm.task.activeFlag);
    this.taskForm.task.statusFlag = this.getStatusFlag(this.taskForm.statusFlag);
    this.taskForm.task.ownerUserId = "tiwakorn.ja"
    this.taskForm.task.taskPartnerList = [];
    // if (this.taskForm.doSelfFlag == true) {
    //   this.taskForm.task.doSelfFlag = 'Y';
    //   this.taskForm.task.taskPartnerList.push({ id: { userId: 'tiwakorn.ja' } });
    // } else {
    //   this.taskForm.task.doSelfFlag = 'N';
    //   this.taskForm.task.taskPartnerList.splice(this.taskForm.task.taskPartnerList.indexOf({ userId: 'tiwakorn.ja' }), 1)
    // }
    for (let obj of this.taskForm.taskMember) {
      if (obj.status == true) {
        this.taskForm.task.taskPartnerList.push({ id: { userId: obj.userId } });
      }
    }
    for (let obj of this.taskForm.taskPartner) {
      this.taskForm.task.taskPartnerList.push({ id: { userId: obj.userId } });
    }
    for (let obj of this.taskForm.taskTagList) {
      this.taskForm.task.taskTagList.push({ tag: { tagName: obj['display'] } });
    }
    console.log(this.taskForm.task);
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
  gettime(data: string) {
    let time = data.split(':');
    let h = time[0];
    let m = time[1];
    return h + m;
  }

  getDate(date) {
    if (date) {
      let d = date.substr(0, 2);
      let m = date.substr(4, 6);
      let y = date.substr(8, 11);
      if (date['date'].month < 10) {
        m = '0' + m;
      }
      return y + m + d;
    }
  }

  receiveMessage(event) {
    this.bgColor = event;
  }
}
