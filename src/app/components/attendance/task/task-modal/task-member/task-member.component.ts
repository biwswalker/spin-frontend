import { PartnerService } from './../../../../../providers/partner.service';
import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';

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
  partnerList: any[] = [];
  partner: any = "";
  autocompletePartnerList: any[] = [];
  constructor(
    private taskModal: TaskModalComponent,
    private partnerService: PartnerService
  ) { }

  ngOnInit() {
    this.owner = "ทิวากร จันทร์ปัญญา"
    this.memberList.push({ name: 'member1', status: true });
    this.memberList.push({ name: 'member2', status: false});
    this.memberList.push({ name: 'member3', status: true });
    this.autocompletePartnerList.push('phai');
    this.autocompletePartnerList.push('pond');
    this.autocompletePartnerList.push('aig');
    this.autocompletePartnerList.push('biw');
    this.findByProjectId();
  }

  initialDefaultData(){
    this.taskModal.taskForm.task.doSelfFlag = 'A'
  }

  addPartner(){
    console.log(this.name);
    let name = "";
    if(this.name != ""){
      name = this.name;
      this.partnerList.push({name: name});
      this.taskModal.taskForm.taskPartner['userId'].push(name);
      this.name = "";
    }
  }

  deletePartner(obj){
    this.partnerList.splice(this.partnerList.indexOf(obj), 1)
  }

  findByProjectId(){
    this.partnerService.findByProjrctId(this.taskModal.taskForm.taskProject.projectId).subscribe(
      data=>{
        console.log(data)
      }
    )
  }
}
