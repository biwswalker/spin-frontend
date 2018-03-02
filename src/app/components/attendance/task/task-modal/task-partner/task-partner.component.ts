import { PartnerService } from './../../../../../providers/partner.service';
import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TaskPartner } from '../../../../../models/task-partner';
import { TaskService } from '../../../../../providers/task.service';
import { AuthenticationService } from '../../../../../providers/authentication.service';
import { User } from '../../../../../models/user';
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
  public doSelfFlag: boolean = true;
  public owner: string = "";
  public userId: string = "";
  public taskMember: any[] = [];
  public autocompletePartnerList: any[] = [];
  public partner: any;

  constructor(
    private taskService: TaskService,
    private partnerService: PartnerService,
    private authService: AuthenticationService
  ) {
    this.authService.crrUser.subscribe((user: User) => {
      this.user = user;
      if (this.user.email) {
        this.owner = this.user.email;
      }
    });

    // this async
    this.taskService.currentProjectId.subscribe(projectId => {
      if (projectId) {
        this.taskMember = [];
        this.taskPartner = [];
        this.autocompletePartnerList = [];
        this.getProjectMember(projectId);
        this.getautoCompletePartner(projectId);
      }
    });
    // End this async

  }

  ngOnInit() {
  }

  getProjectMember(projectId) {
    this.partnerService.findByProjrctId(projectId).subscribe(
      member => {

        if (member) {
          for (let obj of member) {
            this.taskMember.push({ userId: obj.id.userId, email: obj.user.email, status: true });
          }
        }
      })
  }

  getautoCompletePartner(projectId) {
    this.partnerService.findAllUSer(projectId).subscribe(
      partner => {

        if (partner) {
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
      console.log(partner);
      console.log(this.taskMember.indexOf(partner));
      if (this.taskMember.indexOf(partner) == -1) {
        this.taskPartner.push(partner);
      }
      console.log(this.taskPartner);
      console.log(this.autocompletePartnerList.indexOf(partner));
      this.autocompletePartnerList.splice(this.autocompletePartnerList.indexOf(partner), 1);
      console.log(this.autocompletePartnerList)
      this.partner = null;
      partner = null;
      this.selectPartner = null;
    }
  }

  onSelect(event) {
    this.selectPartner = event.item;
  }

  deletePartner(obj) {
    console.log(obj)
    this.autocompletePartnerList.push(obj);
    console.log(this.autocompletePartnerList);
    this.taskPartner.splice(this.taskPartner.indexOf(obj), 1);
    console.log(this.taskPartner);

    // this.taskModal.taskForm.taskPartnerList.splice(this.taskModal.taskForm.taskPartnerList.indexOf(obj), 1);
  }
}
