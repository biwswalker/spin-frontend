import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { Method } from '../config/properties';

@Injectable()
export class ProjectService {

  constructor(private request: HttpRequestService) { }

  createProject(project) {
    return this.request.requestMethodPUT('projects-management', project);
  }

  findProjects(isMember,page,size) {
    return this.request.requestMethodGET('projects-management/find-allow-project/'+isMember+'?p='+page+'&s='+size);
  }

  findProjectById(projectId) {
    return this.request.requestMethodGET(`projects-management/${projectId}`);
  }

  fetchProjectAutocomplete(){
    return this.request.requestMethodGET('projects-management/find-allow-project/N');
  }

}
