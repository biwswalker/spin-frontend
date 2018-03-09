import { PartnerService } from './../../../../../providers/partner.service';
import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TaskPartner } from '../../../../../models/task-partner';
import { TaskService } from '../../../../../providers/task.service';
import { AuthenticationService } from '../../../../../providers/authentication.service';
import { User } from '../../../../../models/user';
import { Task } from '../../../../../models/task';
import { Mode } from '../../../../../config/properties';
declare var $: any;

@Component({
  selector: 'app-task-partner',
  templateUrl: './task-partner.component.html',
  styleUrls: ['./task-partner.component.scss']
})
export class TaskPartnerComponent implements OnInit {

  public user: User = new User();
  public selectPartner: any;
  public taskPartner: any[] = [];
  public task: Task = new Task();
  public doSelfFlag: boolean = true;
  public owner: string = "";
  public taskMember: any[] = [];
  public autocompletePartnerList: any[] = [];
  public partner: any;
  public mode: string;

  constructor(
    private taskService: TaskService,
    private partnerService: PartnerService,
    private authService: AuthenticationService
  ) {
    // this async
    this.taskService.currentProjectId.subscribe(projectId => {
      console.log('currentprojectId: ' , projectId)
      this.getautoCompletePartner(projectId);
      if (projectId && this.task.taskId) {
        // this.autocompletePartnerList = [];
        this.initialMember(projectId, this.task.taskId);
        this.initialPartner(projectId, this.task.taskId);
      } else {
        this.getProjectMember(projectId);
      }
    }
    );
    // End this async
  }

  ngOnInit() {
    // this.taskMember = [];
    // this.taskPartner = [];
    // this.autocompletePartnerList = [];
  }

  initialMember(projectId: number, taskId: number){
    console.log('initialMember')
    this.partnerService.findMemberByProjectId(projectId, this.task.taskId).subscribe(
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

  initialPartner(projectId: number, taskId: number){
    console.log('initialPartner');
    this.partnerService.findNotMemberByProjectId(projectId, taskId).subscribe(
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
    this.partnerService.findAllUSer(projectId).subscribe(
      partner => {
        if (partner) {
          this.autocompletePartnerList = [];
          for (let obj of partner) {
            this.autocompletePartnerList.push({ userId: obj.userId, email: obj.email });
          }
        }
      }
    )
  }

  addPartner() {
    if (this.selectPartner != null) {
      let partner = this.selectPartner;
      if (this.taskMember.indexOf(partner) == -1) {
        this.taskPartner.push(partner);
      }
      this.autocompletePartnerList.splice(this.autocompletePartnerList.indexOf(partner), 1);
      this.partner = null;
      partner = null;
      this.selectPartner = null;
    }
  }

  onSelect(event) {
    this.selectPartner = event.item;
  }

  deletePartner(obj) {
    this.autocompletePartnerList.push(obj);
    this.taskPartner.splice(this.taskPartner.indexOf(obj), 1);
  }
}
