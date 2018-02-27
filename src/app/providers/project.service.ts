import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { Method } from '../config/properties';

@Injectable()
export class ProjectService {

  constructor(private request: HttpRequestService) { }

  createProject(project) {
    return this.request.requestMethodPUT('projects-management', project);
  }

  toggleFavorite(projectId){
    return this.request.requestMethodGET('favorite-project-management/'+projectId);
  }

  findProjects(isMember,page,size) {
    return this.request.requestMethodGET('projects-management/find-allow-project/'+isMember+'?p='+page+'&s='+size);
  }

  findProjectById(projectId) {
    return this.request.requestMethodGET('projects-management/'+projectId);
  }
  findProjectPhaseById(projectId) {
    return this.request.requestMethodGET('/project-phase-management/'+projectId);
  }

  fetchProjectAutocomplete(){
    return this.request.requestMethodGET('projects-management/find-autocomplete-project/N');
  }

}
