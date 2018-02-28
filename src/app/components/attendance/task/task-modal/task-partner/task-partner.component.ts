import { PartnerService } from './../../../../../providers/partner.service';
import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TaskPartner } from '../../../../../models/task-partner';
import { TaskService } from '../../../../../providers/task.service';
declare var $: any;

@Component({
  selector: 'app-task-partner',
  templateUrl: './task-partner.component.html',
  styleUrls: ['./task-partner.component.scss']
})
export class TaskPartnerComponent implements OnInit {

  public selectPartner: any;
  public taskPartner: any[];
  public doSelfFlag: boolean = true;
  public owner: string = "";
  public taskMember: any[];
  public autocompletePartnerList: any[];
  public partner: any;

  constructor(
    private taskService: TaskService,
    private partnerService: PartnerService
  ) {
    // this async
    this.taskService.currentProjectId.subscribe(projectId => {
      if (projectId) {
        this.getProjectMember(projectId);
        this.getautoCompletePartner(projectId);
      }
    });
    // End this async
  }

  ngOnInit() {
    this.owner = "tiwakorn.ja@summitthai.com"
  }

  getProjectMember(projectId) {
    this.partnerService.findByProjrctId(projectId).subscribe(member => {
      console.log('member: ', member)
      this.taskMember = member;
      for (let obj of member) {
        obj.status = true;
      }
    })
  }

  getautoCompletePartner(projectId) {
    this.partnerService.findAllUSer(projectId).subscribe(
      partner => {
        console.log(partner);
        this.autocompletePartnerList = partner;
      }
    )
  }

  addPartner() {
    if (this.selectPartner != null) {
      let partner = this.selectPartner;
      console.log(partner);
      console.log(this.taskMember.indexOf(partner));
      if (this.taskMember.indexOf(partner) <= -1) {
        this.taskPartner.push(partner);
        console.log(this.taskPartner);
        console.log(partner)
        this.autocompletePartnerList.splice(this.taskPartner.indexOf(partner), 1);
        console.log(this.autocompletePartnerList)
      }
      // this.partner = null;
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
