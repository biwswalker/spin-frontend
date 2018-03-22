import { PartnerService } from './../../../../../providers/partner.service';
import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TaskPartner } from '../../../../../models/task-partner';
import { TaskService } from '../../../../../providers/task.service';
import { Task } from '../../../../../models/task';
import { Mode } from '../../../../../config/properties';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from '../../../../../providers/utils/utils.service';
import { User } from '../../../../../models/user';
declare var $: any;

@Component({
  selector: 'app-task-partner',
  templateUrl: './task-partner.component.html',
  styleUrls: ['./task-partner.component.scss', '../task-modal.component.scss']
})
export class TaskPartnerComponent {

  public taskId: number;
  public user: User;
  public owner: string = '';
  public selectPartner: any;
  public taskPartner: any[];
  public doSelfFlag: boolean = true;
  public taskMember: any[];
  public autocompletePartnerList: any[];
  public partner: any;
  public mode: string;
  public projectId: number;
  public hiddenCheckBox: boolean;


  constructor(
    private taskService: TaskService,
    private partnerService: PartnerService,
    public utilsService: UtilsService
  ) {
  }

  initTaskPartner(taskId: number, mode: string, user: User, taskOwner: string) {

    if (taskOwner) {
      if (user.userId !== taskOwner) {
        this.hiddenCheckBox = true;
      } else {
        if (mode == Mode.E) {
          this.hiddenCheckBox = true;
        }
        this.hiddenCheckBox = false;
      }
    } else {
      this.hiddenCheckBox = false;
    }

    this.taskId = taskId;
    this.mode = mode;
    this.owner = taskOwner;
    this.user = user;
    let isRepeat: number = 0;
    this.autocompletePartnerList = [];
    this.taskMember = [];
    this.taskPartner = [];
    this.taskService.currentProjectId.subscribe((projectId: number) => {
      if (projectId) {
        this.projectId = projectId;
        if (isRepeat !== projectId) {
          this.getautoCompletePartner(projectId);
          if (this.taskId) {
            this.initialMember(projectId);
            this.initialPartner(projectId);
          } else {
            this.getProjectMember(projectId);
          }
          isRepeat = projectId;
        }
      }
    });
  }

  initialMember(projectId: number) {
    this.partnerService.findMemberByProjectId(projectId, this.taskId).subscribe(
      members => {
        if (members) {
          for (let obj of members) {
            if (obj.isPartner == "Y") {
              this.taskMember.push({ userId: obj.userId, email: obj.email, fullName: obj.nameTh + ' ' + obj.lastnameTh, status: true });
            } else {
              this.taskMember.push({ userId: obj.userId, email: obj.email, fullName: obj.nameTh + ' ' + obj.lastnameTh, status: false });
            }
          }
        } else {
          this.getProjectMember(projectId);
        }
      }
    );
  }

  initialPartner(projectId: number) {
    this.partnerService.findNotMemberByProjectId(projectId, this.taskId).subscribe(
      nonMembers => {
        if (nonMembers) {
          // this.taskPartner = [];
          for (let obj of nonMembers) {
            this.taskPartner.push({ userId: obj.userId, email: obj.email, fullName: obj.nameTh + ' ' + obj.lastnameTh });
          }
        }
      }
    );
  }

  getProjectMember(projectId) {
    this.partnerService.findByProjrctId(projectId).subscribe(
      member => {
        if (member) {
          // this.taskMember = [];
          for (let obj of member) {
            this.taskMember.push({ userId: obj.id.userId, email: obj.user.email, fullName: obj.user.officer.firstNameTh + ' ' + obj.user.officer.lastNameTh, status: false });
          }
        }
      })
  }

  getautoCompletePartner(projectId) {
    this.partnerService.findAllUser(projectId).subscribe(
      partners => {
        this.autocompletePartnerList = partners;
      }
    );
  }

  addPartner() {
    if (this.selectPartner != null) {
      let sPartner = this.selectPartner;
      if (this.taskMember.indexOf(sPartner) == -1) {
        this.taskPartner.push(sPartner);
        this.autocompletePartnerList.splice(this.autocompletePartnerList.indexOf(sPartner), 1);
      }
      this.partner = null;
      this.selectPartner = null;
    }
  }

  onSelect(event) {
    this.selectPartner = event;
  }

  deletePartner(obj) {
    if (obj) {
      this.taskPartner.splice(this.taskPartner.indexOf(obj), 1);
      this.autocompletePartnerList.push(obj);
    }
  }
}
