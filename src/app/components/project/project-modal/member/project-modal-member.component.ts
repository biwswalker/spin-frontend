import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectMember } from '../../../../models/project-member';
import { OfficerService } from '../../../../providers/officer.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'project-modal-member',
  styleUrls: ['./project-modal-member.component.scss'],
  templateUrl: './project-modal-member.component.html'
})
export class ProjectModalMemberComponent implements OnInit {

  public projectMemberGroup: FormGroup;
  public projectMember: ProjectMember = new ProjectMember;
  public projectMembers: ProjectMember[] = [];
  public selected: any = null;
  // public searchResult = Observable<any[]>();


  constructor(private officerService: OfficerService) { }


  ngOnInit() {
    this.projectMember = new ProjectMember;
    this.projectMembers = [];
    this.validateForm();
    this.officerService.fetchAllAutocomplete('A').subscribe(
      data=>{
        console.log(data)
      }
    )
  }


  validateForm(){
    this.projectMemberGroup = new FormGroup({
      userId: new FormControl(this.projectMember.userId, Validators.required),
      respId: new FormControl(this.projectMember.respId, Validators.required),

    })
  }
}
