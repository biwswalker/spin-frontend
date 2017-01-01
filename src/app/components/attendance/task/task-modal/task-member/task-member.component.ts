import { PartnerService } from './../../../../../providers/partner.service';
import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TaskPartner } from '../../../../../models/task-partner';

@Component({
  selector: 'app-task-member',
  templateUrl: './task-member.component.html',
  styleUrls: ['./task-member.component.scss']
})
export class TaskMemberComponent implements OnInit {

  status: boolean;
  name: string = "";
  owner: string = "";
  memberList: any[] = [];
  public partnerList: any[] = [];
  partner: any = "";
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

  addPartner(){
    let partner = null;

    if(this.partner != null){
      partner = this.partner;
      console.log(partner)
      this.partnerList.push(partner);
      this.taskModal.taskForm.task.taskPartnerList.push(partner.userId)
      this.partner = null;
    }
  }

  deletePartner(obj){
    console.log(obj)
    console.log(obj.userId)
    console.log(this.taskModal.taskForm.task.taskPartnerList.indexOf(obj.userId))
    this.partnerList.splice(this.partnerList.indexOf(obj), 1)
    this.taskModal.taskForm.task.taskPartnerList.splice(this.taskModal.taskForm.task.taskPartnerList.indexOf(obj), 1)
  }

  // findByProjectId(){
  //   this.partnerService.findByProjrctId(this.taskModal.taskForm.taskProject.projectId).subscribe(
  //     data=>{
  //       console.log(data)
  //     }
  //   )
  // }
}
