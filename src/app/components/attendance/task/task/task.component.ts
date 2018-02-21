import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../../models/task';
import { TaskService } from '../../../../providers/task.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskDirective implements OnInit {

  @Input() source: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onselectTask() {
    this.taskService.chageSelectedTask(this.source);
  }

  onView() {
    console.log('on view')
  }

}
