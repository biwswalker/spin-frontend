import { PartnerService } from './../../../../../providers/partner.service';
import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TaskPartner } from '../../../../../models/task-partner';
declare var $: any;

@Component({
  selector: 'app-task-partner',
  templateUrl: './task-partner.component.html',
  styleUrls: ['./task-partner.component.scss']
})
export class TaskPartnerComponent implements OnInit {

  owner: string = "";
  partner: TaskPartner;
  public autocompletePartnerList: any[] = [];
  memberStatus: boolean;
  constructor(
    public taskModal: TaskModalComponent,
    private partnerService: PartnerService
  ) { }

  ngOnInit() {
    this.owner = "ทิวากร จันทร์ปัญญา"
  }

  initialDefaultData(){
  }

  addPartner(event){
    console.log(event)
    let partner;
    if(this.partner != null){
      partner = this.partner;
      console.log(partner)
      if(this.taskModal.taskForm.taskMember.indexOf(partner) <= -1){
        this.taskModal.taskForm.taskPartner.push(partner);
        this.taskModal.taskForm.autocompletePartnerList.splice(this.taskModal.taskForm.taskPartner.indexOf(partner), 1);
        console.log(this.taskModal.taskForm.autocompletePartnerList);
      }

      this.partner = null;
      console.log(this.taskModal.taskForm.taskPartner);
    }
  }

  onclick(){
    $('#add-partner-btn').click( function(){
      $('autocompletePartner')
    });
  }

  deletePartner(obj){
    this.taskModal.taskForm.taskPartner.splice(this.taskModal.taskForm.taskPartner.indexOf(obj), 1);
    this.autocompletePartnerList.push(obj);
    // this.taskModal.taskForm.taskPartnerList.splice(this.taskModal.taskForm.taskPartnerList.indexOf(obj), 1);
  }
}
