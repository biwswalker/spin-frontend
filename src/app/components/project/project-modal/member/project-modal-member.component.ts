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
  }

  validateForm(){
    this.projectMemberGroup = new FormGroup({
      phase_name: new FormControl(this.projectMember.user_id, Validators.required),
      resp_id: new FormControl(this.projectMember.resp_id, Validators.required),

    })
  }
}
