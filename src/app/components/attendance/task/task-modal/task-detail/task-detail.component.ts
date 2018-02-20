import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  color: string = "";
  startTime: any = "";
  endTime: any = "";
  topic: string = "";
  activity: string = "";
  taskProject: string = "";
  taskDate: any = "";

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    return this.color = "I'm from TaskDetailComponent";
    // console.log('taskDate: ', this.taskDate);
    // console.log('startTime: ', this.startTime);
    // console.log('endTime: ', this.endTime);
    // console.log('topic: ', this.topic);
    // console.log('ativity: ', this.activity);
    // console.log('taskProject: ', this.taskProject);
  }

  onColor(color) {
    console.log(color)
  }
}
