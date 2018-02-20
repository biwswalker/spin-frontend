import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  private task: Task = new Task();
  private taskList: Task[] = [];

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
}
