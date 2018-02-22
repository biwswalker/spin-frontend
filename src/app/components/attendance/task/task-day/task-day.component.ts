import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Task } from '../../../../models/task';
import { TaskService } from '../../../../providers/task.service';
import { Observable } from 'rxjs/Observable';
import { TaskForm } from '../../../../forms/taskForm';
declare var SpinTask: any;

@Component({
  selector: 'task-day',
  templateUrl: './task-day.component.html',
  styleUrls: ['./task-day.component.scss']
})
export class TaskDayComponent implements OnInit, AfterViewInit {

  public taskForms = new Observable<TaskForm[]>();

  constructor(private taskService: TaskService) {
    this.taskForms = this.taskService.findTaskByDate('25610222')
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let stask = new SpinTask();
    stask.initial();
  }

}
