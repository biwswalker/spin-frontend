import { ProjectService } from './../../../../../providers/project.service';
import { PartnerService } from './../../../../../providers/partner.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TaskPartner } from '../../../../../models/task-partner';
import { TaskService } from '../../../../../providers/task.service';
import { Task } from '../../../../../models/task';
import { Mode, Status } from '../../../../../config/properties';
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
  public user: User = new User();
  public owner: string = '';
  public selectPartner: any;
  public taskPartner: any[];
  public doSelfFlag: boolean = true;
  public taskMember: any[];
  public autocompletePartnerList: any[];
  public mode: string;
  public projectId: number;
  public isHidden: boolean = false;
  public isHiddenCheckBox: boolean = false;
  public isHiddenAddPartner: boolean = false;
  public isHiddenDeletePartner: boolean = false;
  public isDisableDoSelfFlag: boolean = false;
  public sumMember: number;
  public refTask: number = 0;


  constructor(
    private taskService: TaskService,
    private partnerService: PartnerService,
    public utilsService: UtilsService,
    public projectService: ProjectService
  ) {}

  initTaskPartner(task: Task, user: User, taskOwner: string) {
    this.sumMember = 0;
    this.user = user;
    this.taskId = task.taskId;
    this.refTask = task.referTaskId;
    this.owner = taskOwner;
    let isRepeat: number = 0;
    this.autocompletePartnerList = [];
    this.taskMember = [];
    this.taskPartner = [];
    this.taskService.currentProjectId.subscribe((projectId: number) => {
      if (projectId) {
        this.isHidden = true;
        this.projectId = projectId;
        if (isRepeat !== projectId) {
          this.getautoCompletePartner(projectId);
          if (this.taskId) {
            if (this.refTask) {
              this.findMemberByTaskId(this.refTask);
              this.initialPartner(projectId ,this.refTask);
            } else {
              this.findMemberByTaskId(this.taskId);
              this.initialPartner(projectId, this.taskId);
            }
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
        this.sumMember = 0;
        if (members) {
          this.taskMember = [];
          for (let obj of members) {
            if (obj.userId !== this.user.userId) {
              if (obj.isPartner == "Y") {
                this.taskMember.push({ userId: obj.userId, email: obj.email, fullName: obj.nameTh + ' ' + obj.lastnameTh, status: true });
                this.sumMember++;
              } else {
                this.taskMember.push({ userId: obj.userId, email: obj.email, fullName: obj.nameTh + ' ' + obj.lastnameTh, status: false });
              }
            }
          }
          console.log('SumMember: ', this.sumMember)
        }
      }
    );
  }

  initialPartner(projectId: number, taskId: number) {
    this.partnerService.findNotMemberByProjectId(projectId, taskId).subscribe(
      nonMembers => {
        if (nonMembers) {
          console.log(nonMembers)
          this.taskPartner = [];
          for (let obj of nonMembers) {
            this.taskPartner.push({ userId: obj.userId, email: obj.email, fullName: obj.nameTh + ' ' + obj.lastnameTh });
          }
          console.log('taskPartner.length : ' , this.taskPartner.length)
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
            if (obj.id.userId !== this.user.userId) {
              this.taskMember.push({ userId: obj.id.userId, email: obj.user.email, fullName: obj.user.officer.firstNameTh + ' ' + obj.user.officer.lastNameTh, status: false });
            }
          }
        }
      }
    )
  }

  async getautoCompletePartner(projectId) {
    this.autocompletePartnerList = [];
    await this.partnerService.findAllUserByProjectId(projectId).map(
      partners => {
        if (partners) {
          this.autocompletePartnerList = partners;
          for (let obj of this.autocompletePartnerList) {
            if (obj.userId == this.user.userId) {
              this.autocompletePartnerList.splice(obj);
            }
          }
        }
      }
    ).toPromise();
  }

  findMemberByTaskId(refId: number) {
    this.projectService.findByTaskId(refId).subscribe(
      members => {
        this.sumMember = 0;
        if(members){
          console.log(members);
          this.taskMember = [];
          for (let member of members) {
            if (member.userId !== this.user.userId) {
              if (member.isPartner == "Y") {
                this.taskMember.push({ userId: member.userId, email: member.email, fullName: member.userName, status: true });
                this.sumMember++;
              } else {
                this.taskMember.push({ userId: member.userId, email: member.email, fullName: member.userName, status: false });
              }
            }
          }
<<<<<<< HEAD
=======
          console.log('SumMember: ', this.sumMember)
>>>>>>> b99ca333a929084b14c0ecb1daffdd741b044e70
        }
      }
    )
  }

  countTaskMember(event) {
    (event == true) ? this.sumMember++ : this.sumMember--;
  }

  addPartner() {
    console.log(this.selectPartner)
    if (this.selectPartner) {
      let sPartner = this.selectPartner;
      if (this.taskMember.indexOf(sPartner) == -1) {
        this.taskPartner.push(sPartner);
        // this.autocompletePartnerList.splice(this.autocompletePartnerList.indexOf(sPartner), 1);
      }
      this.selectPartner = '';
    }
  }

  onSelect(event) {
    console.log(event)
    this.selectPartner = event;
    this.autocompletePartnerList.splice(this.autocompletePartnerList.indexOf(event), 1);
  }

  deletePartner(obj) {
    if (obj) {
      this.taskPartner.splice(this.taskPartner.indexOf(obj), 1);
      this.autocompletePartnerList.push(obj);
    }
  }
}
