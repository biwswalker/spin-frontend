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
import { UtilsService } from '../../../../providers/utils/utils.service';



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
  public user: User = new User;
  public responsibilities: Responsibility[] = [];
  public userId:string;
  public respId:string;

  constructor(private officerService: OfficerService,
  private respService:ResponsibilityService,
  private utilsService: UtilsService,
  private projectService: ProjectService) {
  }


  ngOnInit() {
    this.projectMember = new ProjectMember;
    this.projectMembers = [];
    this.validateForm();


    // this.users = this.officerService.fetchAllAutocomplete('A');
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
      userName: new FormControl(this.userId, Validators.required),
      respId: new FormControl(this.respId, Validators.required),

    })
  }

  onDeleteMember(index){
    this.projectMembers.splice(index, 1);
  }


  onSelectedMember(event){
    this.projectMember.user = event;
    this.projectMember.id.userId = this.projectMember.user.userId;
  }


  onSelectedResp(event){
    this.projectMember.responsibility = event;
    this.projectMember.respId = this.projectMember.responsibility.respId;
    this.projectMember.respName = this.projectMember.responsibility.respName;
  }

  onSubmit(){
    this.utilsService.findInvalidControls(this.projectMemberGroup);
    if(this.projectMemberGroup.valid){
      const result = this.projectMembers.filter(user=>user.id.userId == this.userId);

      if(result.length == 0){
        this.projectMembers = this.projectMembers.concat(this.projectMember);
        this.projectMember = new ProjectMember;
        this.userId = null;
        this.respId = null;
        this.projectMemberGroup.reset();
      }

    }
  }

  prepareDataForEdit(projectId){
    this.projectService.findProjectMemberById(projectId).subscribe(
      data=>{
        this.projectMembers = data;
      }
    )
  }

}
