import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../../models/task';
import { TaskService } from '../../../../providers/task.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskDirective implements OnInit {

  // Directive
  @Input() source: Task;

  // Is set css class
  public selected = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    // Async
    this.taskService.currentTask.subscribe(task => {
      if (task.taskId === this.source.taskId) {
        this.selected = true;
      } else {
        this.selected = false;
      }
    })
    // End Async
  }

  onselectTask() {
    this.taskService.chageSelectedTask(this.source);
  }

  onView() {
    console.log('on view')
  }

}
