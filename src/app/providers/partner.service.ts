
import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

@Injectable()
export class PartnerService {

  constructor(private request: HttpRequestService) { }

  findByProjrctId(prjId: number){
    return this.request.requestMethodGET('project-member-management/' + prjId);
  }

  findUserNonProjectMember(){
    return this.request.requestMethodGET('user-management/users/' + 'Y');
  }

  findAllUSer(prjId: number){
      return this.request.requestMethodGET('user-management/users/project-id/'+ prjId);
  }

  findByTaskId(taskId: number){
    return this.request.requestMethodGET('taskpartner-management/taskpartner/' + taskId);
  }

  findNotMemberByProjectId(prjId: number){
    return this.request.requestMethodGET('taskpartner-management/taskpartners/non-project-member/' + prjId);
  }

  findMemberByProjectId(prjId: number){
    return this.request.requestMethodGET('taskpartner-management/taskpartners/project-member/' + prjId);
  }
}
