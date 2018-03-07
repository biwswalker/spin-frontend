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
  public allTask = new Observable<TaskAll[]>();
  private subjectKeyword = new BehaviorSubject<string>(this.keyword);
  private crrKeyword = this.subjectKeyword.asObservable();
  private nowPage = 1;
  private timeout = null;
  private isCriteria = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.findAllTask();
    this.crrKeyword.subscribe(keyword => {
      if (keyword) {
        this.isCriteria = true;
        this.allTask = this.taskService.findCriteriaTask(keyword, this.nowPage, 5, true);
      } else {
        this.isCriteria = false;
        this.findAllTask();
      }
    });
  }

  findAllTask() {
    this.nowPage = 1;
    this.allTask = this.taskService.findAllTask(1, 5, true);
  }

  onSearch() {
    this.subjectKeyword.next(this.keyword)
  }

  onScrollDown() {
    console.log('scrolled!!');
    this.nowPage++;
    if (this.isCriteria) {
      // this.allTask = this.allTask.concat(this.taskService.findCriteriaTask(this.keyword, this.nowPage, 5, true));
      this.allTask.concat(this.taskService.findCriteriaTask(this.keyword, this.nowPage, 5, true));
    } else {
      // this.allTask = this.allTask.concat(this.taskService.findAllTask(this.nowPage, 5, true));
      this.allTask.concat(this.taskService.findAllTask(this.nowPage, 5, true));
    }
  }

  ngOnDestroy() {
    this.subjectKeyword.unsubscribe();
  }


}
