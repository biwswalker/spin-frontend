import { User } from './../../models/user';
import { UtilsService } from './../../providers/utils/utils.service';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { AuthenticationService } from '../../providers/authentication.service';
import { ProjectService } from '../../providers/project.service';
import { EventService } from '../../providers/utils/event.service';
import { Project } from '../../models/project';


@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent{
  public user: User = new User;
  public renderPage:boolean = false;
  @ViewChild(ProjectSearchComponent) projectSearch;
  @ViewChild(ProjectInfoComponent) projectInfo;
  @ViewChild(ProjectModalComponent) projectModal;
  constructor(
    private projectService: ProjectService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private utilsService: UtilsService) {

     }

    ngAfterContentInit() {
    console.log('ProjectComponent start')
    this.authService.crrUser.subscribe(user=>{
      console.log('this.user: ',this.user)
      this.user = user;
      this.renderPage = true;
      },
      err=>{
        console.log(err);
      }
    );

  }

  ngOnDestroy(){
      console.log('ngOnDestroy.......');
  }



  onNewProjectClick(){
    this.projectModal.newProject();
  }

  passKeyToChildrens(projectId){
    this.projectInfo.projectDetail.ngOnInit();
    this.projectInfo.projectMember.ngOnInit();
    this.projectInfo.projectSummary.ngOnInit();
    this.projectInfo.sendKeyToChilds(projectId);
    this.displayProjectDetail(projectId);
    this.displayProjectMember(projectId);

  }
  displayProjectDetail(projectId){
    this.projectInfo.projectDetail.user = this.user;
    this.projectInfo.projectDetail.projectPhases = [];
    this.projectService.findProjectById(projectId).subscribe(
      data=>{
        if(data!)
        this.projectInfo.projectDetail.project = data;
      },err=>{
        console.log(err);
      }
    );
    this.projectService.findProjectPhaseById(projectId).subscribe(
      data=>{
        if(data.length != 0){
          this.projectInfo.projectDetail.projectPhases = data;
          this.projectInfo.projectSummary.projectPhases = data;
          this.projectInfo.projectSummary.displayProjectSummary(projectId,(data[0].id.seqId));
        }

      },err=>{
        console.log(err);
      }
    );

  }

  displayProjectMember(projectId){
    this.projectInfo.projectMember.projectMemberList = [];
    this.projectService.findProjectMemberById(projectId).subscribe(
      data=>{
        this.projectInfo.projectMember.projectMemberList = data;
      },err=>{
        console.log('Exception: ',err);
      }
    )
  }

}
