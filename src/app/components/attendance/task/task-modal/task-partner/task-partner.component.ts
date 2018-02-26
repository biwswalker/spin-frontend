import { PartnerService } from './../../../../../providers/partner.service';
import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TaskPartner } from '../../../../../models/task-partner';

@Component({
  selector: 'app-task-partner',
  templateUrl: './task-partner.component.html',
  styleUrls: ['./task-partner.component.scss']
})
export class TaskPartnerComponent implements OnInit {

  owner: string = "";
  public partnerList: any[] = [];
  partner: TaskPartner;
  public autocompletePartnerList: any[] = [];
  constructor(
    public taskModal: TaskModalComponent,
    private partnerService: PartnerService
  ) { }

  ngOnInit() {
    this.owner = "ทิวากร จันทร์ปัญญา"

  }

  initialDefaultData(){
    this.taskModal.taskForm.task.doSelfFlag = 'A'
  }

  addPartner(event){
    console.log(event)
    let partner = null;
    if(this.partner != null){
      partner = this.partner;
      console.log(partner)
      // if(this.taskModal.taskForm.taskPartner.indexOf(partner) <= -1){
      //   this.taskModal.taskForm.taskPartner.push(partner);
      //   this.taskModal.taskForm.autocompletePartnerList.splice(this.taskModal.taskForm.autocompletePartnerList.indexOf(partner), 1);
      // }
      if(this.taskModal.taskForm.taskPartner.indexOf(partner) <= -1){
        this.partnerList.push(partner);
        console.log(this.partnerList);
        this.taskModal.taskForm.autocompletePartnerList.splice(this.partnerList.indexOf(partner), 1);
        console.log(this.taskModal.taskForm.autocompletePartnerList);
      }
      this.partner = null;
      console.log(this.taskModal.taskForm.taskPartner);
    }
  }

  deletePartner(obj){
    this.partnerList.splice(this.partnerList.indexOf(obj), 1);
    this.autocompletePartnerList.push(obj);
    // this.taskModal.taskForm.taskPartnerList.splice(this.taskModal.taskForm.taskPartnerList.indexOf(obj), 1);
  }
}