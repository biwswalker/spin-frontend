import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { HttpRequestService } from './utils/http-request.service';
import { Observable } from 'rxjs/Observable';
import { TaskForm } from '../forms/taskForm';

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

  updateCurrentTimeTask(date, start, end) {
    this.task.workDate = date;
    this.task.workStartTime = start;
    this.task.workEndTime = end;
    this.selectedTask.next(this.task);
  }

  findWorkingTaskByDate(date) {
    return this.request.requestMethodGET(`task-management/working-tasks/date/${date}`);
  }

  findTaskByDate(date): Observable<TaskForm[]> {
    return new Observable(observer => {
      return this.request.requestMethodGET(`task-management/tasks/date/${date}`).subscribe((tasks: Task[]) => {
        let taskFormList: TaskForm[] = [];
        let taskForm = new TaskForm();
        for (let task of tasks) {
          taskForm = new TaskForm();
          taskForm.task = task;
          taskFormList.push(taskForm);
        }
        observer.next(taskFormList);
        return observer;
      });
    });
  }

  insertTask(task: Task) {
    return this.request.requestMethodPUT('task-management/tasks', task);
  }

  findUnStamped(year, month){
    return this.request.requestMethodGET(`task-management/un-stamp-task/${year}/${month}`)
  }
}
