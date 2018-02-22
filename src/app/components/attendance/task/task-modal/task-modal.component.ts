import { TaskMemberComponent } from './task-member/task-member.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskForm } from '../../../../forms/taskForm';
import { TaskTagComponent } from './task-tag/task-tag.component';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit  {

  public bgColor:string;
  public taskForm: TaskForm;

  constructor() { }


  ngOnInit() {
    this.taskForm = new TaskForm();
    // this.validateForm();
  }

  validateForm(){
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          // Listrening Tab Click
            document.getElementById("tap-info").addEventListener('click', function(event) {
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

  onSubmit(){
    console.log(this.taskForm)

  }

  receiveMessage(event){
    this.bgColor = event;
    console.log(this.bgColor)
  }
}
