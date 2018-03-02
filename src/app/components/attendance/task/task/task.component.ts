import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../../models/task';
import { TaskService } from '../../../../providers/task.service';

declare var SpinModal: any;
declare var $: any;
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
  public isCollaborator = false;
  public isView = false;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.isCollaborator = this.source.taskPartnerList ? true : false;
    // Async
    this.taskService.currentIsSelectTask.subscribe(task => {
      if (task === this.source.taskId) {
        this.selected = true;
      } else {
        this.selected = false;
      }
    })
    // End Async
  }

  onselectTask() {
    if (!this.isView) {
      this.taskService.chageSelectedTask(this.source);
    } else {
      this.isView = false;
    }
  }

  onView() {
    this.isView = true;
    let self = this;
    // Call Modal
    let modal = new SpinModal();
    modal.initial('#task-modal', { show: true, backdrop: 'static', keyboard: true })
    $('#task-modal').on("hidden.bs.modal", function () {
      self.isView = false;
    })
    this.taskService.onViewTask(this.source);
    
  }

}
