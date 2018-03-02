import { ProjectMember } from './../../../../models/project-member';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../providers/project.service';

@Component({
  selector: 'app-prj-info-member',
  templateUrl: './prj-info-member.component.html',
  styleUrls: ['./prj-info-member.component.scss']
})
export class PrjInfoMemberComponent implements OnInit {

  public projectMemberList: ProjectMember[] = [];
  public projectId:string;
  constructor(private projectService:ProjectService) { }

  ngOnInit() {
  }


}
