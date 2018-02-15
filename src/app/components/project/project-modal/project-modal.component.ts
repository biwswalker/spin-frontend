import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../providers/project.service';
import { ProjectModalDetailComponent } from './detail/project-modal-detail.component';
import { EventService } from '../../../providers/event.service';

@Component({
  selector: 'project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {

  public project: Project = new Project();
  @ViewChild(ProjectModalDetailComponent) projectDetailChild;

  constructor(private projectService: ProjectService, private eventService: EventService) { }

  ngOnInit() {
    this.projectDetailChild.project = this.project;
  }

  onSubmit() {
    console.log(this.projectDetailChild.projectDetailGroup);
    if(this.projectDetailChild.projectDetailGroup.valid){
      const projectDetail = this.projectDetailChild.projectDetailGroup.value;
      let projectObj = new Project();
      projectObj = projectDetail;
      projectObj.visibilityFlag = (projectDetail.visibilityFlag == true ? 'Y' : 'N');

      // Call Provider
      this.projectService.createProject(projectObj).subscribe(event => {
        console.log(this.eventService.getEventMessage(event))
        console.log(this.eventService.getProgressPercent(event))
      })
      this.project = new Project();
    }
  }

}
