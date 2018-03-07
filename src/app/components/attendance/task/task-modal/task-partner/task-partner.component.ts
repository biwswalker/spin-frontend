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
      if (projectId) {
        this.taskPartner = [];
        this.autocompletePartnerList = [];
        this.getProjectMember(projectId);
        this.getautoCompletePartner(projectId);
        if (this.mode == Mode.E) {
          this.partnerService.findMemberByProjectId(projectId, this.task.taskId).subscribe(
            member => {
              console.log(member);
            }
          );
          this.partnerService.findNotMemberByProjectId(projectId, this.task.taskId).subscribe(
            nonMember => {
              console.log(nonMember)
              if (nonMember) {
                for (let obj of nonMember) {
                  // this.taskPartner.push({ userId: obj.user-id, email: obj.email });
                  // console.log(this.taskPartner)
                }
              }
            }
          )
        }
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
          this.taskMember = [];
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

  getTaskPartner(taskId: number) {
    this.partnerService.findByTaskId(taskId).subscribe(
      partner => {
        console.log(partner);
        // for(let obj of partner){
        //   this.taskPartner.push({})
        // }
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
