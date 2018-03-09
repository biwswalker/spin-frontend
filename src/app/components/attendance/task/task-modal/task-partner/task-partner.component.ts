import { PartnerService } from './../../../../../providers/partner.service';
import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TaskPartner } from '../../../../../models/task-partner';
import { TaskService } from '../../../../../providers/task.service';
import { Task } from '../../../../../models/task';
import { Mode } from '../../../../../config/properties';
import { Observable } from 'rxjs/Observable';
declare var $: any;

@Component({
  selector: 'app-task-partner',
  templateUrl: './task-partner.component.html',
  styleUrls: ['./task-partner.component.scss']
})
export class TaskPartnerComponent {

  public taskId: number;
  public ownerEmail = '';
  public selectPartner: any;
  public taskPartner: any[] = [];
  public doSelfFlag: boolean = true;
  public taskMember: any[] = [];
  public autocompletePartnerList = new Observable<any[]>()
  public partner: any;
  public mode: string;

  constructor(
    private taskService: TaskService,
    private partnerService: PartnerService
  ) {
  }

  initTaskPartner(taskId: number, mode: string, usrEmail: string) {
    this.taskId = taskId;
    this.mode = mode;
    this.ownerEmail = usrEmail;
    this.taskService.currentProjectId.subscribe(projectId => {
      console.log('this.taskService.currentProjectId.subscribe')
      if (projectId) {
        this.getautoCompletePartner(projectId);
        if (this.taskId) {
          this.initialMember(projectId);
          this.initialPartner(projectId);
        } else {
          this.getProjectMember(projectId);
        }
      }
    });
  }

  initialMember(projectId: number) {
    console.log('initialMember')
    this.partnerService.findMemberByProjectId(projectId, this.taskId).subscribe(
      members => {
        if (members) {
          this.taskMember = [];
          for (let obj of members) {
            if (obj.isPartner == "Y") {
              this.taskMember.push({ userId: obj.userId, email: obj.email, status: true });
            } else {
              this.taskMember.push({ userId: obj.userId, email: obj.email, status: false });
            }
            console.log(this.taskMember);
          }
        }
      }
    );
  }

  initialPartner(projectId: number) {
    console.log('initialPartner');
    this.partnerService.findNotMemberByProjectId(projectId, this.taskId).subscribe(
      nonMembers => {
        if (nonMembers) {
          this.taskPartner = [];
          for (let obj of nonMembers) {
            this.taskPartner.push({ userId: obj.userId, email: obj.email });
          }
          console.log(this.taskPartner);
        }
      }
    );
  }

  getProjectMember(projectId) {
    this.partnerService.findByProjrctId(projectId).subscribe(
      member => {
        if (member) {
          this.taskMember = [];
          for (let obj of member) {
            this.taskMember.push({ userId: obj.id.userId, email: obj.user.email, status: false });
          }
        }
      })
  }

  getautoCompletePartner(projectId) {
    this.autocompletePartnerList = this.partnerService.findAllUser(projectId).map(atpPartner => {
      for (let selecteds of this.taskPartner) {
        atpPartner = atpPartner.filter(item => item.userId !== selecteds.userId)
      }
      return atpPartner;
    });
  }

  addPartner() {
    if (this.selectPartner != null) {
      let sPartner = this.selectPartner;
      if (this.taskMember.indexOf(sPartner) == -1) {
        this.taskPartner.push(sPartner);
      }
      this.partner = null;
      this.selectPartner = null;
    }
  }

  onSelect(event) {
    this.selectPartner = event.item;
  }

  deletePartner(obj) {
    this.taskPartner.splice(this.taskPartner.indexOf(obj), 1);
  }
}
