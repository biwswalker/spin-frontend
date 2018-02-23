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
  public project: Project = new Project;
  @ViewChild(ProjectModalDetailComponent) projectModalDetail;
  @ViewChild(ProjectModalPhaseComponent) projectModalPhase;
  @ViewChild(ProjectModalMemberComponent) projectModalMember;
  private modal = new SpinModal();

  constructor(private projectService: ProjectService, private eventService: EventService, private authService: AuthenticationService) { }

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
      this.project.visibilityFlag = (this.project.isVisble == true ? 'A' : 'I');

      // Call Provider
      this.projectService.createProject(this.project).subscribe(
        data => {
          console.log(data);
          this.oncloseModal();
      });
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
    this.modal.close('#project-modal');
    this.project = new Project;
  }

}
