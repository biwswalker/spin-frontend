import { ProjectPhase } from './../../../../models/project-phase';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prj-info-summary',
  templateUrl: './prj-info-summary.component.html',
  styleUrls: ['./prj-info-summary.component.scss']
})
export class PrjInfoSummaryComponent implements OnInit {
  public projectId:string;
  public projectPhases: ProjectPhase[]=[];
  public memberSpent:any;
  public memberSummary: any[] = [];
  public tagsSpent: any;
  public tagsSummary: any[] = [];
  constructor() { }

  ngOnInit() {

  }



}
