import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService, TaskAll } from '../../../../providers/task.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concat';
import { Task } from '../../../../models/task';

@Component({
  selector: 'task-all',
  templateUrl: './task-all.component.html',
  styleUrls: ['./task-all.component.scss']
})
export class TaskAllComponent implements OnInit, OnDestroy {

  public keyword = ''
  public tasks: TaskAll[] = [];
  private subjectKeyword = new BehaviorSubject<string>(this.keyword);
  private crrKeyword = this.subjectKeyword.asObservable();
  private timeout = null;
  private isCriteria = false;
  private size = 5;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.crrKeyword.subscribe(keyword => {
      this.size = 5;
      if (keyword) {
        this.isCriteria = true;
        this.taskService.findCriteriaTask(keyword, 1, this.size, true).subscribe(taska => {
          this.tasks = taska;
        });
      } else {
        this.isCriteria = false;
        this.findAllTask();
      }
    });
  }

  findAllTask() {
    this.taskService.findAllTask(1, this.size, true).subscribe(taska => {
      this.tasks = taska;
    });
  }

  onTaskCompleted(){
    this.findAllTask();
  }

  onSearch() {
    this.subjectKeyword.next(this.keyword)
  }

  onScrollDown() {
    this.size += 5;
    if (this.isCriteria) {
      this.taskService.findCriteriaTask(this.keyword, 1, this.size, true).subscribe(taska => {
        this.tasks = taska;
      });
    } else {
      this.taskService.findAllTask(1, this.size, true).subscribe(taska => {
        this.tasks = taska;
      });
    }
  }

  ngOnDestroy() {
    this.subjectKeyword.unsubscribe();
  }


}
