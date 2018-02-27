import { Component, OnInit, ViewChild } from '@angular/core';
import { PrjInfoDetailComponent } from './prj-info-detail/prj-info-detail.component';
import { PrjInfoMemberComponent } from './prj-info-member/prj-info-member.component';
import { PrjInfoSummaryComponent } from './prj-info-summary/prj-info-summary.component';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {

  @ViewChild(PrjInfoDetailComponent) projectDetail;
  @ViewChild(PrjInfoMemberComponent) projectMember;
  @ViewChild(PrjInfoSummaryComponent) projectSummary;
  constructor() { }

  ngOnInit() {

  }

  sendKeyToChilds(projectId){
    this.projectDetail.displayProjectDetail(projectId);
  }

}
