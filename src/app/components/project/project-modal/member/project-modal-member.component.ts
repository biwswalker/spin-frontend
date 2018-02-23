import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectMember } from '../../../../models/project-member';

@Component({
  selector: 'project-modal-member',
  styleUrls: ['./project-modal-member.component.scss'],
  templateUrl: './project-modal-member.component.html'
})
export class ProjectModalMemberComponent implements OnInit {

  public projectMemberGroup: FormGroup;
  public projectMember: ProjectMember = new ProjectMember;
  public projectMembers: ProjectMember[] = [];

  constructor() { }

  ngOnInit() {
    this.projectMember = new ProjectMember;
    this.projectMembers = [];
    this.validateForm();
  }

  validateForm(){
    this.projectMemberGroup = new FormGroup({
      userId: new FormControl(this.projectMember.userId, Validators.required),
      respId: new FormControl(this.projectMember.respId, Validators.required),

    })
  }
}
