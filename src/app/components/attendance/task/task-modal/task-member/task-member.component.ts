import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
    this.owner = "ทิวากร จันทร์ปัญญา"
    this.memberList.push({ name: 'member1', status: true });
    this.memberList.push({ name: 'member2', status: false});
    this.memberList.push({ name: 'member3', status: true });
  }

  addPartner(){
    let name = "";
    if(this.name != ""){
      name = this.name;
      this.partnerList.push({name: name});
      this.name = "";
    }
  }

  deletePartner(obj){
    this.partnerList.splice(this.partnerList.indexOf(obj), 1)
  }

}
