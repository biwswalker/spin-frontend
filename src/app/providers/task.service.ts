import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { HttpRequestService } from './utils/http-request.service';
import { Observable } from 'rxjs/Observable';
import { TaskForm } from '../forms/task-form';
import { ProjectService } from './project.service';
import { Project } from '../models/project';
import { UtilsService } from './utils/utils.service';

@Injectable()
export class TaskService {

  private task = new Task();
  private selectedTask = new BehaviorSubject<Task>(new Task);
  public currentTask = this.selectedTask.asObservable();

  private isSelectTask = new BehaviorSubject<number>(0);
  public currentIsSelectTask = this.isSelectTask.asObservable();

  private viewTask = new BehaviorSubject<Task>(new Task);
  public currentViewTask = this.viewTask.asObservable();

  public selectedProjectId = new BehaviorSubject<number>(0);
  public currentProjectId = this.selectedProjectId.asObservable();
  public autocompletePartner = this.selectedProjectId.asObservable();

  private timetableDate = new BehaviorSubject<string>(this.utilsService.getCurrentEnDate());
  public currentTimetableDate = this.timetableDate.asObservable();

  constructor(private request: HttpRequestService, private projectSerive: ProjectService, private utilsService: UtilsService) { }

  chageSelectedTask(selected: Task) {
    if (this.task.taskId) {
      if (selected.taskId === this.task.taskId) {
        this.isSelectTask.next(0);
        this.task = new Task();
      } else {
        this.task = selected;
        this.isSelectTask.next(this.task.taskId);
      }
    } else {
      this.task = selected;
      this.isSelectTask.next(this.task.taskId);
    }
  }

  updateCurrentTimeTask(date, start, end) {
    this.task.workDate = date;
    this.task.workStartTime = start;
    this.task.workEndTime = end;
    this.selectedTask.next(this.task);
  }

  onViewTask(task: Task) {
    this.viewTask.next(task);
  }

  changeTimetableDate(date) {
    this.timetableDate.next(date);
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

  findUnStamped(year, month) {
    return this.request.requestMethodGET(`task-management/un-stamp-task/${year}/${month}`)
  }

  removeTask(taskId: number){
    console.log(taskId);
    return this.request.requestMethodDelete('task-management/tasks/' + taskId);
  }
}
