import { EventMessagesService } from './../../../providers/utils/event-messages.service';
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
export class ProjectModalComponent{
  public project: Project = new Project;
  public modal = new SpinModal();
  @ViewChild(ProjectModalDetailComponent) projectModalDetail;
  @ViewChild(ProjectModalPhaseComponent) projectModalPhase;
  @ViewChild(ProjectModalMemberComponent) projectModalMember;


  constructor(private projectService: ProjectService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private eventMessageService: EventMessagesService) {

    }
  ngAfterViewInit(){
    this.projectService.currentProjectAct.subscribe((project:Project)=>{
      if(project.projectId){
        this.project = new Project;
        this.project = project;
        this.updateProject(this.project);
      }
    },
  err=>{
    console.log("Error: ",err);
  },
  ()=>{

  }
  )
  }

  onSubmit(){
    if(this.project.projectId == null){
      this.onSubmitInsert();
    }else{
      this.onSubmitUpdate();
    }
  }

  onSubmitInsert() {
    if(this.projectModalDetail.projectDetailGroup.valid){
      this.project = new Project;
      this.project = this.projectModalDetail.project;
      this.project.projectPhaseList = this.projectModalPhase.projectPhases;
      this.project.projectMemberList = this.projectModalMember.projectMembers;
      this.project.visibilityFlag = (this.project.isVisble == false ? 'Y' : 'N');
      // Call Provider
      this.projectService.createProject(this.project).subscribe(
        data => {
          this.oncloseModal();
          this.eventMessageService.onInsertSuccess('');
        },
        err=>{
          console.log("Exception: ",err);
          this.eventMessageService.onInsertError(err);
        },
        ()=>{
          this.projectService.onProjectHaveChanged();
        }
      );
    }
  }

  onSubmitUpdate() {
    console.log('onSubmitUpdate......');
    if(this.projectModalDetail.projectDetailGroup.valid){
      this.project = new Project;
      this.project = this.projectModalDetail.project;
      this.project.projectPhaseList = this.projectModalPhase.projectPhases;
      this.project.projectMemberList = this.projectModalMember.projectMembers;
      this.project.visibilityFlag = (this.project.isVisble == true ? 'N' : 'Y');


      // Call Provider
      this.projectService.updateProject(this.project).subscribe(
        data => {
          this.oncloseModal();
          this.eventMessageService.onUpdateSuccess('');
        },
        err=>{
          console.log("Exception: ",err);
          this.eventMessageService.onUpdateError(err);
        },
        ()=>{
          this.projectService.onProjectHaveChanged();
        });
    }
  }

  initChild(){
    this.projectModalDetail.ngOnInit();
    this.projectModalPhase.ngOnInit();
    this.projectModalMember.ngOnInit();
  }

  newProject(){
    this.onOpenModal();
    this.project = new Project;
    this.initChild();

  }

  updateProject(project:Project){
    this.onOpenModal();
    this.initChild();
    this.projectModalDetail.prepareDataForEdit(project.projectId);
    this.projectModalPhase.prepareDataForEdit(project.projectId);
    this.projectModalMember.prepareDataForEdit(project.projectId);

  }

  oncloseModal(){
    this.modal.close('#project-modal');
  }

  onOpenModal(){
    this.modal.initial('#project-modal', { show: true, backdrop: 'static', keyboard: true });
  }



}
