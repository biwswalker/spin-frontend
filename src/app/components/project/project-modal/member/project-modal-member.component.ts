import { User } from './../../../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectMember } from '../../../../models/project-member';
import { OfficerService } from '../../../../providers/officer.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';



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

  constructor(private officerService: OfficerService) {
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
    )


  ;
  }


  validateForm(){
    this.projectMemberGroup = new FormGroup({
      userId: new FormControl(this.projectMember.userId, Validators.required),
      respId: new FormControl(this.projectMember.respId, Validators.required),

    })
  }

  onSubmit(){
    console.log(this.user);
    if(this.projectMemberGroup.valid){
      this.projectMember.user = this.user;
      this.projectMembers = this.projectMembers.concat(this.projectMember);
      this.user = null;
    }
  }




}
