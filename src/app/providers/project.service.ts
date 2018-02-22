import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { Method } from '../config/properties';

@Injectable()
export class ProjectService {

  constructor(private request: HttpRequestService) { }

  createProject(project) {
    // return this.request.requestWithProgress(Method.POST, 'projects', project);
    return this.request.requestMethodPOST('projects', project)
  }

  findProjects(isMember,page,size) {
    return this.request.requestMethodGET('projects-management/find-allow-project/'+isMember+'?page='+page+'&size='+size);
  }

}
