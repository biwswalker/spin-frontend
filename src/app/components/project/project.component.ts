import { ProjectModalComponent } from './project-modal/project-modal.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { AuthenticationService } from '../../providers/authentication.service';
import { ProjectService } from '../../providers/project.service';
import { EventService } from '../../providers/utils/event.service';


@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @ViewChild(ProjectSearchComponent) projectSearch;
  @ViewChild(ProjectInfoComponent) projectInfo;
  @ViewChild(ProjectModalComponent) projectModal;
  constructor(
    private projectService: ProjectService,
    private eventService: EventService,
    private authService: AuthenticationService) { }

  ngOnInit() {

  }

  onNewProjectClick(){
    this.projectModal.newProject();
  }

  passKeyToProjectDetail(projectId){
    console.log('passKeyToProjectDetail: '+projectId);
    this.projectInfo.sendKeyToChilds(projectId);
  }

}
