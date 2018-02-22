import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/task';

@Component({
  selector: 'tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
<<<<<<< HEAD
export class TaskComponent implements OnInit, AfterViewInit {


  private task: Task = new Task();
  private taskList: Task[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    let stask = new SpinTask();
    stask.initial();
  }

  ngOnInit() {
    let modal = new SpinModal();
    modal.initial('#task-modal', { show: true, backdrop: 'static', keyboard: true })

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
=======
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
>>>>>>> 3e58b9333a8c6f4e89e1bdd8588ee91ff01c7cd1
  }

}
