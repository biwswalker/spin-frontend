import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Task } from '../../../../models/task';
import { TaskService } from '../../../../providers/task.service';
import { AuthenticationService } from '../../../../providers/authentication.service';
import { User } from '../../../../models/user';
import { Subscription } from 'rxjs';
import { PartnerService } from '../../../../providers/partner.service';
import { Observable } from 'rxjs/Observable';

declare var SpinModal: any;
declare var $: any;
@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskDirective implements OnInit, OnDestroy {

  // Directive
  @Input() source: Task;

  // Is set css class
  public selected = false;
  public isView = false;
  public isOwner = '';
  public isCollaborator = new Observable<any>()
  private subscription: Subscription;

  constructor(private taskService: TaskService, private authService: AuthenticationService, private partnerService: PartnerService) {}

  ngOnInit() {
    this.subscription = this.authService.crrUser.subscribe((user: User) => {
      if(user.userId !== this.source.ownerUserId){
        this.isOwner = 'owner'
      }else{
        this.isOwner = ''
      }
    })

    this.isCollaborator = this.partnerService.findByTaskId(this.source.taskId);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
