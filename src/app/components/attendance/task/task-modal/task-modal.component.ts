import { FormGroup } from '@angular/forms';
import { TaskMemberComponent } from './task-member/task-member.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskForm } from '../../../../forms/taskForm';
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
  public taskForm: TaskForm = new TaskForm();

  // @ViewChild(TaskDetailComponent) taskDetailComponent;
  // @ViewChild(TaskMemberComponent) taskMemberComponent;
  // @ViewChild(TaskTagComponent) taskTagComponent;

  constructor(private taskService: TaskService,
    private partnerService: PartnerService) { }


  ngOnInit() {
    this.onTimestampCommit();
    this.findAllUser();
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

  findAllUser() {
    this.partnerService.findAllUSer().subscribe(
      data => {
        this.taskForm.autocompletePartnerList = data;
        console.log(this.taskForm.autocompletePartnerList);
      }
    )

  }

  // onSubmit(){
  //   this.getDate();
  //   this.taskForm.task.activeFlag = 'A'
  //   this.taskForm.task.projectId = this.taskForm.taskProject['prjId'];
  //   this.taskForm.task.workStartTime = this.gettime(this.taskForm.task.workStartTime);
  //   this.taskForm.task.workEndTime = this.gettime(this.taskForm.task.workEndTime);
  //   this.taskForm.task.activeFlag = this.getStatusFlag(this.taskForm.task.activeFlag);
  //   this.taskForm.task.statusFlag = this.getStatusFlag(this.taskForm.task.statusFlag);
  //   this.taskForm.task.ownerUserId = 'tiwakorn.ja';
  //   this.taskForm.task.doSelfFlag = "N";
  //   console.log(this.taskForm.task)
  // this.taskService.insertTask(this.taskForm.task).subscribe(
  //   res => {
  //     console.log(res)
  //   },
  //   error=>{
  //     console.log(error)
  //   }
  // )
  // }

  onSubmit() {
    console.log(this.taskForm.taskProject.projectId)
    this.getDate();
    this.taskForm.task.projectId = this.taskForm.taskProject.projectId;
    this.taskForm.task.workStartTime = this.gettime(this.taskForm.task.workStartTime);
    this.taskForm.task.workEndTime = this.gettime(this.taskForm.task.workEndTime);
    this.taskForm.task.activeFlag = this.getStatusFlag(this.taskForm.task.activeFlag);
    this.taskForm.task.statusFlag = this.getStatusFlag(this.taskForm.task.statusFlag);
    this.taskForm.task.ownerUserId = 'tiwakorn.ja';
    for(let obj of this.taskForm.taskTag){
      this.taskForm.task.taskTagList.push(obj.value)
    }
    console.log(this.taskForm)
    this.taskService.insertTask(this.taskForm.task).subscribe(
        res => {
          console.log(res)
        },
        error=>{
          console.log(error)
        }
      )
  }

  getStatusFlag(data) {
    if (data == true) {
      return 'A'
    } else {
      return 'I'
    }
  }
  gettime(data: string) {
    console.log(data)
    let time = data.split(':');
    let h = time[0];
    console.log(h)
    let m = time[1];
    console.log(m)
    return h + m;
  }

  getDate() {
    let d = this.taskForm.task.workDate['date'].day.toString();
    let m = this.taskForm.task.workDate['date'].month.toString();
    let y = (this.taskForm.task.workDate['date'].year+543).toString();
    if (this.taskForm.task.workDate['date'].month < 10) {
      m = '0' + m;
    }
    this.taskForm.task.workDate = y + m + d;
  }

  setDate(date) {
    // let d = date.subsste
    // let d = new Date(date)
    // console.log(d);
    // return d;
  }

  receiveMessage(event) {
    this.bgColor = event;
    console.log(this.bgColor)
  }
}
