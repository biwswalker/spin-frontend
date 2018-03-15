import { TaskForm } from './../../../forms/task-form';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskDayComponent } from './task-day/task-day.component';
import { TaskAllComponent } from './task-all/task-all.component';

@Component({
  selector: 'tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @ViewChild(TaskDayComponent) taskDayChild;
  @ViewChild(TaskAllComponent) taskAllChild;

  constructor() { }

  ngOnInit() {
  }

  onInsertTaskCompleted(date) {
    this.taskDayChild.onTaskCompleted(date);
    this.taskAllChild.onTaskCompleted();
  }

}
