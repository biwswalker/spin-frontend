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

  selectPartner: any;
  owner: string = "";
  partner: any;
  memberStatus: boolean;
  constructor(
    public taskModal: TaskModalComponent,
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
    this.owner = "ทิวากร จันทร์ปัญญา"
  }

  getProjectMember(projectId) {
    this.partnerService.findByProjrctId(projectId).subscribe(projects => {
      console.log(projects)
      this.taskModal.taskForm.taskMember = projects;
      console.log(this.taskModal.taskForm.taskMember)
    })
  }

  getautoCompletePartner(projectId) {
    this.partnerService.findAllUSer(projectId).subscribe(
      partner => {
        console.log(partner);
        this.taskModal.taskForm.autocompletePartnerList = partner;
      }
    )
  }

  addPartner() {
    if (this.selectPartner != null) {
      let partner = this.selectPartner;
      // console.log(partner);
      console.log(this.taskModal.taskForm.taskMember.indexOf(partner));
      if (this.taskModal.taskForm.taskMember.indexOf(partner) <= -1) {
        this.taskModal.taskForm.taskPartner.push(partner);
        console.log(this.taskModal.taskForm.taskPartner);
        console.log(partner)
        this.taskModal.taskForm.autocompletePartnerList.splice(this.taskModal.taskForm.taskPartner.indexOf(partner), 1);
        console.log(this.taskModal.taskForm.autocompletePartnerList)
      }
      this.partner = null;
      this.selectPartner = null;
    }
  }

  onSelect(event) {
    this.selectPartner = event.item;
  }

  deletePartner(obj) {
    console.log(obj)
    this.taskModal.taskForm.autocompletePartnerList.push(obj);
    console.log(this.taskModal.taskForm.autocompletePartnerList);
    this.taskModal.taskForm.taskPartner.splice(this.taskModal.taskForm.taskPartner.indexOf(obj), 1);
    console.log(this.taskModal.taskForm.taskPartner);

    // this.taskModal.taskForm.taskPartnerList.splice(this.taskModal.taskForm.taskPartnerList.indexOf(obj), 1);
  }
}
