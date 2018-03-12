import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { Method } from '../config/properties';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../models/project';

@Injectable()
export class ProjectService {

  public editProject = new BehaviorSubject<Project>(new Project);
  public currentProjectAct = this.editProject.asObservable();

  private isProjectHaveChanged = new BehaviorSubject<number>(0);
  public projectHaveChanged = this.isProjectHaveChanged.asObservable();

  constructor(private request: HttpRequestService) { }

  // Begin Insert Update Delete Actions
  createProject(project) {
    return this.request.requestMethodPUT('projects-management', project);
  }

  updateProject(project) {
    return this.request.requestMethodPOST('projects-management', project);
  }

  toggleFavorite(projectId){
    return this.request.requestMethodGET('favorite-project-management/'+projectId);
  }
  // End Insert Update Delete Actions


  // Begin find for display action
  findProjects(isMember,page,size) {
    return this.request.requestMethodGET('project-management/projects/find-allow-project/'+isMember+'?p='+page+'&s='+size);
  }
  findProjectById(projectId) {
    return this.request.requestMethodGET('project-management/projects/'+projectId);
  }
  findProjectPhaseById(projectId) {
    return this.request.requestMethodGET('project-phase-management/project-phases/'+projectId);
  }
  findProjectMemberById(projectId){
    return this.request.requestMethodGET('project-member-management/project-members/'+projectId);
  }
  findMemberSummary(projectId,seqId){
    return this.request.requestMethodGET('task-management/sums-each-user-id/project-id/'+projectId+'/phase-id/'+seqId);
  }
  findTagsSummary(projectId,seqId){
    return this.request.requestMethodGET('task-management/sums-each-tags/project-id/'+projectId+'/phase-id/'+seqId);
  }
  findProjectAbbrById(projectId) {
    return this.findProjectById(projectId).map(project => {
      return project.projectAbbr;
    });
  }
  // End find for display action

  findFavoriteProjectByUserId(userId: string){
    return this.request.requestMethodGET('favorite-project-management/favorite-projects/find-autocomplete-project');
  }

  fetchProjectAutocomplete(){
    return this.request.requestMethodGET('project-management/projects/find-autocomplete-project/N');
  }


  onUpdateProject(project:Project){
    console.log('onUpdateProject............');
    this.editProject.next(project);
  }

  onProjectHaveChanged(){
    console.log('onProjectHaveChanged......');
    this.isProjectHaveChanged.next(1);
  }

}
