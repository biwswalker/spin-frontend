import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { Method } from '../config/properties';
declare var SpinModal: any;
@Injectable()
export class ProjectService {
  private modal = new SpinModal();
  constructor(private request: HttpRequestService) { }

  // Begin Insert Update Delete Actions
  createProject(project) {
    return this.request.requestMethodPUT('projects-management', project);
  }

  toggleFavorite(projectId){
    return this.request.requestMethodGET('favorite-project-management/'+projectId);
  }
  // End Insert Update Delete Actions


  // Begin find for display action
  findProjects(isMember,page,size) {
    return this.request.requestMethodGET('projects-management/find-allow-project/'+isMember+'?p='+page+'&s='+size);
  }
  findProjectById(projectId) {
    return this.request.requestMethodGET('projects-management/'+projectId);
  }
  findProjectPhaseById(projectId) {
    return this.request.requestMethodGET('project-phase-management/'+projectId);
  }
  findProjectMemberById(projectId){
    return this.request.requestMethodGET('project-member-management/'+projectId);
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
    return this.request.requestMethodGET('favorite-project-management/find-autocomplete-project');
  }

  fetchProjectAutocomplete(){
    return this.request.requestMethodGET('projects-management/find-autocomplete-project/N');
  }

  onOpenModal(){
    this.modal.initial('#project-modal', { show: true, backdrop: 'static', keyboard: true });
  }

  onCloseModal(){
    this.modal.close('#project-modal');
  }

}
