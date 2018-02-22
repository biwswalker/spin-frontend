import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Task } from '../../../../models/task';
declare var SpinTask: any;

@Component({
  selector: 'task-day',
  templateUrl: './task-day.component.html',
  styleUrls: ['./task-day.component.scss']
})
export class TaskDayComponent implements OnInit, AfterViewInit {

  private task: Task = new Task();
  public taskList: Task[] = [];

  constructor() { }

  ngOnInit() {
    this.task = new Task();
    this.task.taskId = 1;
    this.task.topic = "Spin WTF"
    this.task.ownerUserId = "Jannarong Sanpang"
    this.task.activity = "วิ่งเล่นในสนามหญ้า แล้วเจองูกีดไข่ ดิ้นดุ๊กดิ๊ก"
    this.taskList.push(this.task)
    this.task = new Task();
    this.task.taskId = 2;
    this.task.topic = "2"
    this.task.ownerUserId = "Jannarong Sanpang"
    this.task.activity = "วิ่งเล่นในสนามหญ้า แล้วเจองูกีดไข่ ดิ้นดุ๊กดิ๊ก"
    this.taskList.push(this.task)
    this.task = new Task();
    this.task.taskId = 3;
    this.task.topic = "3"
    this.task.ownerUserId = "Jannarong Sanpang"
    this.task.activity = "วิ่งเล่นในสนามหญ้า แล้วเจองูกีดไข่ ดิ้นดุ๊กดิ๊ก"
    this.taskList.push(this.task)
  }

  ngAfterViewInit(): void {
    let stask = new SpinTask();
    stask.initial();
  }

}
