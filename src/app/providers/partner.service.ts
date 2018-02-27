
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
    console.log(prjId)
      return this.request.requestMethodGET('user-management/users/project-id/'+ prjId);
  }
}
