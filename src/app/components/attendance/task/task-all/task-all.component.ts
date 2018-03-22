import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService, TaskAll } from '../../../../providers/task.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concat';
import { Task } from '../../../../models/task';
import { EventMessagesService } from '../../../../providers/utils/event-messages.service';

@Component({
  selector: 'task-all',
  templateUrl: './task-all.component.html',
  styleUrls: ['./task-all.component.scss']
})
export class TaskAllComponent implements OnInit {

  public keyword = '';
  public tasks: TaskAll[] = [];
  public page = 1;
  public size = 10;

  public throttle = 1000;
  public scrollDistance = 1;

  constructor(private taskService: TaskService,
  private eventMessageService:EventMessagesService) { }

  ngOnInit() {
    this.doSearch();
  }

  doSearch(){
    this.tasks = [];
    this.page = 1;
    this.onScrollDown();
  }

  onScrollDown() {
    this.taskService.findCriteriaTask(this.keyword,this.page,this.size).subscribe(
      data=>{
        console.log(data)
        if(data!){
          // data = ;
          this.tasks = this.tasks.concat(this.taskService.reformTasks(data));

          this.page += 1;
        }

      },err=>{
        console.log(err);
        this.eventMessageService.onCustomError('เกิดข้อผิดพลาด',err.error.message);
      }
    )

  }


}
