import { ProjectModalMemberComponent } from './member/project-modal-member.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../providers/project.service';
import { ProjectModalDetailComponent } from './detail/project-modal-detail.component';
import { EventService } from '../../../providers/utils/event.service';
import { AuthenticationService } from '../../../providers/authentication.service';
import { ProjectModalPhaseComponent } from './phase/project-modal-phase.component';
declare var SpinModal: any;
@Component({
  selector: 'project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {

  public project: Project = new Project();
  @ViewChild(ProjectModalDetailComponent) projectModalDetail;
  @ViewChild(ProjectModalPhaseComponent) projectModalPhase;
  @ViewChild(ProjectModalMemberComponent) projectModalMember;
  private modal = new SpinModal();

  constructor(private projectService: ProjectService, private eventService: EventService, private authService: AuthenticationService) { }

  ngOnInit() {

    this.projectModalDetail.project = this.project;
    // this.authService.authen()
  }

  onSubmit() {
    console.log(this.projectModalDetail.projectDetailGroup);
    if(this.projectModalDetail.projectDetailGroup.valid){
      const projectDetail = this.projectModalDetail.projectDetailGroup.value;
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

  newProject(){
    this.openModal();
  }

  updateProject(){
    this.openModal();
  }

  openModal(){
    this.modal.initial('#project-modal', { show: true, backdrop: 'static', keyboard: true });
  }

  oncloseModal(){

  }

}
