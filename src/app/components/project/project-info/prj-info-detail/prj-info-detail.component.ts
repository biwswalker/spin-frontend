import { ProjectService } from './../../../../providers/project.service';
import { ProjectPhase } from './../../../../models/project-phase';
import { Project } from './../../../../models/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prj-info-detail',
  templateUrl: './prj-info-detail.component.html',
  styleUrls: ['./prj-info-detail.component.scss']
})
export class PrjInfoDetailComponent implements OnInit {

  public project:Project = new Project;
  public projectPhases:ProjectPhase[] = [];
  public projectId:string;
  constructor(private projectService:ProjectService) { }

  ngOnInit() {
  }



}
