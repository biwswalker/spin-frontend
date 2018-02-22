import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { HttpRequestService } from './utils/http-request.service';

@Injectable()
export class TaskService {

  private selectedTask = new BehaviorSubject<Task>(new Task);
  private task = new Task();
  public currentTask = this.selectedTask.asObservable();

  constructor(private request: HttpRequestService) { }

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

  updateCurrentTimeTask(start, end) {
    this.task.workStartTime = start;
    this.task.workEndTime = end;
    this.selectedTask.next(this.task);
  }

  findWorkingTaskByDate(date) {
    return this.request.requestMethodGET(`task-management/working-tasks/date/${date}`);
  }

  insertTask(taskForm: Task) {
    return this.request.requestMethodPUT('task-management/tasks', taskForm);
  }
}
