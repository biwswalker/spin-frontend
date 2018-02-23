import { Responsibility } from './../../../../models/responsibility';
import { User } from './../../../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectMember } from '../../../../models/project-member';
import { OfficerService } from '../../../../providers/officer.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ResponsibilityService } from '../../../../providers/responsibility.service';



@Component({
  selector: 'project-modal-member',
  styleUrls: ['./project-modal-member.component.scss'],
  templateUrl: './project-modal-member.component.html'
})
export class ProjectModalMemberComponent implements OnInit {

  public projectMemberGroup: FormGroup;
  public projectMember: ProjectMember = new ProjectMember;
  public projectMembers: ProjectMember[] = [];
  public users: User[] = [];
  public responsibilities: Responsibility[] = [];
  public userName:string;
  public respName:string;

  constructor(private officerService: OfficerService,
  private respService:ResponsibilityService) {
  }


  ngOnInit() {
    this.projectMember = new ProjectMember;
    this.projectMembers = [];
    this.validateForm();



    this.officerService.fetchAllAutocomplete('A').subscribe(
      data=>{
        this.users = data;
      },err=>{
        console.log(err);
      }
    );

    this.respService.fetchResponsibilityAutocomplete('A').subscribe(
      data=>{
        this.responsibilities = data;
      },err=>{
        console.log(err);
      }
    );


  ;
  }


  validateForm(){
    this.projectMemberGroup = new FormGroup({
      userId: new FormControl(this.projectMember.userId, Validators.required),
      respId: new FormControl(this.projectMember.respId, Validators.required),

    })
  }

  onSelectedMember(event){
    console.log(event);
    this.projectMember.user = event.item;
  }

  onSelectedResp(event){
    console.log(event);
    this.projectMember.responsibility = event.item;
  }

  onSubmit($event){
    console.log(this.userName);
    if(this.projectMemberGroup.valid){
      this.projectMembers = this.projectMembers.concat(this.projectMember);
      this.projectMember = new ProjectMember;
      this.userName = null;
      this.respName = null;
    }


  }

}
