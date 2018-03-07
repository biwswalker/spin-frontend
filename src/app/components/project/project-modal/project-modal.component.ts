import { EventMessagesService } from './../../../providers/utils/event-messages.service';
import { ProjectModalMemberComponent } from './member/project-modal-member.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../providers/project.service';
import { ProjectModalDetailComponent } from './detail/project-modal-detail.component';
import { EventService } from '../../../providers/utils/event.service';
import { AuthenticationService } from '../../../providers/authentication.service';
import { ProjectModalPhaseComponent } from './phase/project-modal-phase.component';

@Component({
  selector: 'project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  public project: Project = new Project;
  @ViewChild(ProjectModalDetailComponent) projectModalDetail;
  @ViewChild(ProjectModalPhaseComponent) projectModalPhase;
  @ViewChild(ProjectModalMemberComponent) projectModalMember;


  constructor(private projectService: ProjectService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private eventMessageService: EventMessagesService) { }

  ngOnInit() {

    // this.authService.authen()
  }

  onSubmit() {
    console.log(this.projectModalDetail.projectDetailGroup);
    if(this.projectModalDetail.projectDetailGroup.valid){
      this.project = new Project;
      this.project = this.projectModalDetail.project;
      this.project.projectPhaseList = this.projectModalPhase.projectPhases;
      this.project.projectMemberList = this.projectModalMember.projectMembers;
      this.project.visibilityFlag = (this.project.isVisble == true ? 'Y' : 'N');

      // Call Provider
      this.projectService.createProject(this.project).subscribe(
        data => {
          console.log(data);
          this.oncloseModal();
          this.eventMessageService.onSuccess();
      });
    }
  }
  initChildrens(){
    this.projectModalDetail.ngOnInit();
    this.projectModalPhase.ngOnInit();
    this.projectModalMember.ngOnInit();
  }

  newProject(){
    this.initChildrens();
    this.projectService.onOpenModal();

  }

  updateProject(projectId){
    this.initChildrens();
  }

  oncloseModal(){
    this.projectService.onCloseModal();
    this.project = new Project;
  }

}
