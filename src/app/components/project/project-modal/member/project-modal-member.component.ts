import { ProjectService } from './../../../../providers/project.service';
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
  private respService:ResponsibilityService,
  private projectService: ProjectService) {
  }


  ngOnInit() {
    this.projectMember = new ProjectMember;
    this.projectMembers = [];
    this.validateForm();



    this.officerService.fetchAllAutocomplete('A').subscribe(
      users=>{
        this.users = [];
        for (let user of users){
          user.fullName = user.officer.firstNameTh +' '+user.officer.lastNameTh;
          this.users = this.users.concat(user);
        }

        // this.usersdata;
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
      userName: new FormControl(this.userName, Validators.required),
      respId: new FormControl(this.projectMember.respId, Validators.required),

    })
  }

  onDeleteMember(index){
    this.projectMembers.splice(index, 1);
  }


  onSelectedMember(event){
    console.log('onSelectedMember...');
    this.projectMember.user = event.item;
    this.projectMember.id.userId = this.projectMember.user.userId;
    this.userName = this.projectMember.user.officer.firstNameTh+' '+this.projectMember.user.officer.lastNameTh;
  }

  onSelectedResp(event){
    this.projectMember.responsibility = event.item;
    this.projectMember.respId = this.projectMember.responsibility.respId;
  }

  onSubmit($event){
    if(this.projectMemberGroup.valid){
      this.projectMembers = this.projectMembers.concat(this.projectMember);
      this.projectMember = new ProjectMember;
      this.userName = null;
      this.respName = null;
    }
  }

  prepareDataForEdit(projectId){
    this.projectService.findProjectMemberById(projectId).subscribe(
      data=>{
        console.log('project member: ',data);
        this.projectMembers = data;
      }
    )
  }

}
