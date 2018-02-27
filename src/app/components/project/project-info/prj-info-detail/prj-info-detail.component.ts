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

  project:Project = new Project;
  phases:ProjectPhase[] = [];
  constructor(private projectService:ProjectService) { }

  ngOnInit() {
  }

  displayProjectDetail(projectId){
    console.log('displayProjectDetail.....');
    this.projectService.findProjectById(projectId).subscribe(
      data=>{
        if(data!)
        this.project = data;
      },err=>{
        console.log(err);
      }
    );
    this.projectService.findProjectPhaseById(projectId).subscribe(
      data=>{
        if(data!)
        this.phases = data;
      },err=>{
        console.log(err);
      }
    );

  }

}
