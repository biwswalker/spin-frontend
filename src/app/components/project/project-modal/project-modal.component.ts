import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../providers/project.service';
import { ProjectModalDetailComponent } from './detail/project-modal-detail.component';
import { EventService } from '../../../providers/utils/event.service';
import { AuthenticationService } from '../../../providers/authentication.service';

@Component({
  selector: 'project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {

  public project: Project = new Project();
  @ViewChild(ProjectModalDetailComponent) projectDetailChild;

  constructor(private projectService: ProjectService, private eventService: EventService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.projectDetailChild.project = this.project;
    this.authService.authen()
  }

  onSubmit() {
    console.log(this.projectDetailChild.projectDetailGroup);
    if(this.projectDetailChild.projectDetailGroup.valid){
      const projectDetail = this.projectDetailChild.projectDetailGroup.value;
      let projectObj = new Project();
      projectObj = projectDetail;
      projectObj.visibilityFlag = (projectDetail.visibilityFlag == true ? 'A' : 'I');

      // Call Provider
      this.projectService.createProject(projectObj).subscribe(event => {
        console.log(this.eventService.getEventMessage(event))
        console.log(this.eventService.getProgressPercent(event))
      })
      this.project = new Project();
    }
  }

}
