import { TaskMemberComponent } from './task-member/task-member.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskForm } from '../../../../forms/taskForm';
import { TaskTagComponent } from './task-tag/task-tag.component';
import { TaskService } from '../../../../providers/task.service';
import { Task } from '../../../../models/task';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  public bgColor: string;
  public taskForm: TaskForm;
  public task: Task = new Task();

  constructor(private taskService: TaskService) { }


  ngOnInit() {
    this.taskForm = new TaskForm();
    // this.validateForm();
  }

  onTimestampCommit() {
    this.taskService.currentTask.subscribe(selectedTask => {
      this.task = selectedTask
    })
  }

  validateForm() {
    (function () {
      'use strict';
      window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          // Listrening Tab Click
          document.getElementById("tap-info").addEventListener('click', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
  }

<<<<<<< HEAD
  onSubmit(){
    this.getDate();
    this.taskForm.task.activeFlag = 'A'
    this.taskForm.task.projectId = this.taskForm.taskProject['prjId'];
    this.taskForm.task.workStartTime = this.gettime(this.taskForm.task.workStartTime);
    this.taskForm.task.workEndTime = this.gettime(this.taskForm.task.workEndTime);
    this.taskForm.task.activeFlag = this.getStatusFlag(this.taskForm.task.activeFlag);
    this.taskForm.task.statusFlag = this.getStatusFlag(this.taskForm.task.statusFlag);
    this.taskForm.task.ownerUserId = 'tiwakorn.ja';
    this.taskForm.task.doSelfFlag = "N";
    // this.taskForm.task.taskPartnerList = []
    // this.taskForm.task.statusFlag = (this.taskForm.task.statusFlag == true ? true : false)
=======
  onSubmit() {
>>>>>>> 3e58b9333a8c6f4e89e1bdd8588ee91ff01c7cd1
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

<<<<<<< HEAD
  getStatusFlag(data){
    if(data == true){
      return 'A'
    }else{
      return 'I'
    }
  }
  gettime(data: string){
    console.log(data)
    let time = data.split(':');
    let h = time[0];
    console.log(h)
    let m = time[1];
    console.log(m)
    return h+m;
  }

  getDate(){
    let d = this.taskForm.task.workDate['date'].day.toString();
    let m = this.taskForm.task.workDate['date'].month.toString();
    let y = this.taskForm.task.workDate['date'].year.toString();
    if(this.taskForm.task.workDate['date'].month < 10){
      m = '0' + m;
    }
    this.taskForm.task.workDate = y + m + d;
  }

  receiveMessage(event){
=======
  receiveMessage(event) {
>>>>>>> 3e58b9333a8c6f4e89e1bdd8588ee91ff01c7cd1
    this.bgColor = event;
    console.log(this.bgColor)
  }
}
