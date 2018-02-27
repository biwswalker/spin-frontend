import { FormGroup } from '@angular/forms';
import { TaskPartnerComponent } from './task-partner/task-partner.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskForm } from '../../../../forms/task-form';
import { TaskTagComponent } from './task-tag/task-tag.component';
import { TaskService } from '../../../../providers/task.service';
import { Task } from '../../../../models/task';
import { PartnerService } from '../../../../providers/partner.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  public bgColor: string;
  public taskForm: TaskForm;

  // @ViewChild(TaskDetailComponent) taskDetailComponent;
  // @ViewChild(TaskMemberComponent) taskMemberComponent;
  // @ViewChild(TaskTagComponent) taskTagComponent;

  constructor(private taskService: TaskService,
    private partnerService: PartnerService) { }


  ngOnInit() {
    this.taskForm = new TaskForm();
    this.onTimestampCommit();
    // this.findAllUser();
  }

  onTimestampCommit() {
    this.taskService.currentTask.subscribe(
      selectedTask => {
        this.taskForm.task.workStartTime = this.convertTimeData(selectedTask.workStartTime);
        this.taskForm.task.workEndTime = this.convertTimeData(selectedTask.workEndTime);
      })
  }


  convertTimeData(time) {
    if (time) {
      let hour = time.substring(0, 2);
      let minute = time.substring(2, 4);
      return hour + ':' + minute;
    }

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
    for(let obj of this.taskForm.taskPartner){
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
    if(date){
    let d = date.substr(0, 2);
    let m = date.substr(4, 6);
    let y = date.substr(8, 11);
    if (date['date'].month < 10) {
      m = '0' + m;
    }
    return y + m + d;
  }
  }

  setDate(date) {
    // let d = date.subsste
    // let d = new Date(date)
    // console.log(d);
    // return d;
  }

  receiveMessage(event) {
    this.bgColor = event;
  }
}
