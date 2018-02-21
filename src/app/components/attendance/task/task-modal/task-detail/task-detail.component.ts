import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Time } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();

  color: string = "";
  startTime: string = "";
  endTime: string = "";
  topic: string = "";
  activity: string = "";
  taskProject: string = "";
  taskDate: any = "";
  ProjectList: any[] = [];
  taskStatus: boolean = false;
  colorStatus: boolean = true;
  constructor() { }

  ngOnInit() {

  }

  onClick() {

    // console.log('taskDate: ', this.taskDate);
    // console.log('startTime: ', this.startTime);
    // console.log('endTime: ', this.endTime);
    // console.log('topic: ', this.topic);
    // console.log('ativity: ', this.activity);
    // console.log('taskProject: ', this.taskProject);
  }

  onColorPick(color) {
    // if (color) {
    //   this.color = color;
    //   this.messageEvent.emit(this.color);
    //   this.checkTime();
        console.log('taskDate: ', this.taskDate);
      console.log('startTime: ', this.startTime);
      console.log('endTime: ', this.endTime);
      console.log('topic: ', this.topic);
      console.log('ativity: ', this.activity);
      console.log('taskProject: ', this.taskProject);
      console.log('taskStatus: ', this.taskStatus);
      console.log('ColorStatus: ', this.colorStatus);
    // }
  }

  checkTime() {
    if(this.startTime){
      this.endTime = this.startTime;
    }
  }

  showDate(event) {
    console.log('showDate')
    console.log(this.taskDate)
    console.log(event)
  }

}


