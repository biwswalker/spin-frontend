import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class TaskService {

  private selectedTask = new BehaviorSubject<Task>(new Task);
  private task = new Task();
  public currentTask = this.selectedTask.asObservable();

  constructor() { }

  chageSelectedTask(selected: Task) {
    if (this.task.taskId) {
      if (selected.taskId === this.task.taskId) {
        this.selectedTask.next(new Task());
        this.task = new Task();
      } else {
        this.task = selected;
        this.selectedTask.next(selected);
      }
    } else {
      this.task = selected;
      this.selectedTask.next(selected);
    }
  }
}