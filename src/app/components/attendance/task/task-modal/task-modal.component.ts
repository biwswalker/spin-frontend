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
  public taskForm: TaskForm;

  @ViewChild(TaskDetailComponent) taskDetailChild;
  // @ViewChild(TaskMemberComponent) taskMemberComponent;
  // @ViewChild(TaskTagComponent) taskTagComponent;

  constructor(private taskService: TaskService,
    private partnerService: PartnerService) { }


  onTimestampCommit() {
    this.taskForm = new TaskForm();
    this.findAllUser();
    this.taskService.currentTask.subscribe(
      (selectedTask: Task) => {
        this.taskForm.task = selectedTask
        // Task Detail
        this.taskDetailChild.taskObj = this.taskForm.task;
        this.taskDetailChild.projectObj = this.taskForm.taskProject;    
        this.taskDetailChild.initTaskDetail(); 
      })
  }

  findAllUser() {
    this.partnerService.findAllUSer().subscribe(
      data => {
        if(data){
          console.log(data);
          for(let obj of data){
            this.taskForm.autocompletePartnerList.push({userId: obj.userId,email: obj.email });
          }
        }
      }
    )

  }

  onSubmit() {
    // this.taskForm.task.workDate = this.getDate(this.taskForm.task.workDate);
    this.taskForm.task.workDate = '25610226';
    this.taskForm.task.projectId = this.taskForm.taskProject.projectId;
    this.taskForm.task.workStartTime = this.gettime(this.taskForm.task.workStartTime);
    this.taskForm.task.workEndTime = this.gettime(this.taskForm.task.workEndTime);
    this.taskForm.task.activeFlag = this.getStatusFlag(this.taskForm.task.activeFlag);
    this.taskForm.task.statusFlag = this.getStatusFlag(this.taskForm.task.statusFlag);
    this.taskForm.task.ownerUserId = 'tiwakorn.ja';
    for (let obj of this.taskForm.taskPartner) {
      this.taskForm.task.taskPartnerList.push({ id: { userId: obj} });
    }
    for (let obj of this.taskForm.taskTagList) {
      this.taskForm.task.taskTagList.push({ tag: { tagName: obj['display'] } });
    }
    console.log(this.taskForm.task);
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
    let d = date['date'].day.toString();
    let m = date['date'].month.toString();
    let y = (date['date'].year + 543).toString();
    if (date['date'].month < 10) {
      m = '0' + m;
    }
    return y + m + d;
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
