import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../../models/task';
import { TaskService } from '../../../../providers/task.service';
import { TaskForm } from '../../../../forms/task-form';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskDirective implements OnInit {

  // Directive
  @Input() source: TaskForm;

  // Is set css class
  public selected = false;
  public isCollaborator = false;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.isCollaborator = this.source.taskPartnerList.length > 0 ? true : false;
    // Async
    this.taskService.currentTask.subscribe(task => {
      if (task.taskId === this.source.task.taskId) {
        this.selected = true;
      } else {
        this.selected = false;
      }
    })
    // End Async
  }

  onselectTask() {
    this.taskService.chageSelectedTask(this.source.task);
  }

  onView() {
    console.log('on view')
  }

}
