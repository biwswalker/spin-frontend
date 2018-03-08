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

  clearCurrentTimeTask() {
    this.selectedTask.next(new Task());
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

  findWorkingTaskByWeek(beginDate, endDate) {
    return this.request.requestMethodGET(`task-management/working-tasks/by-week/${beginDate}/${endDate}`);
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
    return this.request.requestMethodPUT('task-management/tasks', task).do(task => {
      return this.clearCurrentTimeTask();
    });
  }

  updateTask(task: Task) {
    return this.request.requestMethodPOST('task-management/tasks', task).do(task => {
      return this.clearCurrentTimeTask();
    });
  }
  findUnStamped(year, month) {
    return this.request.requestMethodGET(`task-management/un-stamp-task/${year}/${month}`)
  }

  removeTask(taskId: number) {
    return this.request.requestMethodDelete('task-management/tasks/' + taskId);
  }

  findAllTask(page: number, size: number, reform: boolean): Observable<any> {
    return this.request.requestMethodGET(`task-management/tasks?p=${page}?&s=${size}`).map(tasks => { return reform ? this.reformTasks(tasks) : tasks });
  }

  findCriteriaTask(cri: string, page: number, size: number, reform: boolean): Observable<any> {
    return this.request.requestMethodGET(`task-management/tasks/${cri}?p=${page}?&s=${size}`).map(tasks => { return reform ? this.reformTasks(tasks) : tasks });
  }

  reformTasks(tasks: Task[]): TaskAll[] {
    let taskAll: TaskAll[] = [];
    let workDateTemp = '';
    let allTask = new TaskAll();
    for (let task of tasks) {
      if (!workDateTemp) {
        workDateTemp = task.workDate;
        allTask = new TaskAll();
        allTask.date = task.workDate;
        allTask.tasks = Observable.of(tasks.filter(task => task.workDate === workDateTemp));
        taskAll.push(allTask);
      } else if (workDateTemp !== task.workDate) {
        workDateTemp = task.workDate;
        allTask = new TaskAll();
        allTask.date = task.workDate;
        allTask.tasks = Observable.of(tasks.filter(task => task.workDate === workDateTemp));
        taskAll.push(allTask);
      }
    }
    return taskAll;
  }
}

export class TaskAll {
  public tasks: any;
  public date: string;

  constructor() {
    this.tasks = new Observable<TaskAll[]>();;
    this.date = '';
  }
}
