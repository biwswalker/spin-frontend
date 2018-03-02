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
export class ProjectComponent implements OnInit {

  @ViewChild(ProjectSearchComponent) projectSearch;
  @ViewChild(ProjectInfoComponent) projectInfo;
  @ViewChild(ProjectModalComponent) projectModal;
  constructor(
    private projectService: ProjectService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private utilsService: UtilsService) { }

  ngOnInit() {

  }

  onNewProjectClick(){
    this.projectModal.newProject();
  }

  passKeyToProjectDetail(projectId){
    console.log('passKeyToProjectDetail: '+projectId);
    this.projectInfo.projectDetail.ngOnInit();
    this.projectInfo.projectMember.ngOnInit();
    this.projectInfo.projectSummary.ngOnInit();
    this.projectInfo.sendKeyToChilds(projectId);
    this.displayProjectDetail(projectId);
    this.displayProjectMember(projectId);

  }
  displayProjectDetail(projectId){
    console.log('displayProjectDetail.....');
    this.projectInfo.projectDetail.project = new Project;
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
        console.log('phase list:',data);
        if(data!){
          this.projectInfo.projectDetail.projectPhases = data;
          this.projectInfo.projectSummary.projectPhases = data;
          this.displayProjectSummary(projectId,data[0].id.seqId);
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
        console.log('memberList: ',data);
        this.projectInfo.projectMember.projectMemberList = data;
      },err=>{
        console.log('Exception: ',err);
      }
    )
  }

  displayProjectSummary(projectId,seqId){
    console.log('projectId: '+projectId+'    phaseId: '+seqId);
    this.projectService.findMemberSummary(projectId,seqId).subscribe(
      data=>{
        console.log(data);
        if(data!){
          this.projectInfo.projectSummary.memberSpent = data.maxSpentTime;
          this.projectInfo.projectSummary.memberSpent.hour = this.utilsService.calcurateHours(data.maxSpentTime.hour,data.maxSpentTime.minute);
          this.projectInfo.projectSummary.memberSummary=[];
          for(let mem of data.summary){
            let memSum = {name:null,hour:0};
            memSum.name = mem.name;
            memSum.hour = this.utilsService.calcurateHours(mem.hour,mem.minute);
            this.projectInfo.projectSummary.memberSummary = this.projectInfo.projectSummary.memberSummary.concat(memSum);
          }
        }
      },err=>{
        console.log('Exception: ',err);
      }
    );

    this.projectService.findTagsSummary(projectId,seqId).subscribe(
      data=>{
        console.log(data);
        if(data!){
          this.projectInfo.projectSummary.tagsSummary = data.summary;
          this.projectInfo.projectSummary.tagsSpent = data.maxSpentTime;
        }
      },err=>{
        console.log('Exception: ',err);
      }
    )

  }
}
