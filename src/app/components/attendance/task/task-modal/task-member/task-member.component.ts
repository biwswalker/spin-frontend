import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-member',
  templateUrl: './task-member.component.html',
  styleUrls: ['./task-member.component.scss']
})
export class TaskMemberComponent implements OnInit {

  name: string = "";
  owner: string = "";
  memberList: any[] = [];
  partnerList: any[] = [];
  constructor() { }

  ngOnInit() {
    this.owner = "ทิวากร จันทร์ปัญญา"
    this.memberList.push({ name: 'member1' });
    this.memberList.push({ name: 'member2' });
    this.memberList.push({ name: 'member3' });
  }

  addPartner(){
    this.partnerList.push({name: this.name});
  }

  deletePartner(obj){
    this.partnerList.splice(this.partnerList.indexOf(obj), 1)
  }
}
