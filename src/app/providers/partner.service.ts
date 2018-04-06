
import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { Observable } from 'rxjs/Observable';
import { Officer } from '../models/officer';

@Injectable()
export class PartnerService {

  constructor(private request: HttpRequestService) { }

  findByProjrctId(prjId: number) {
    return this.request.requestMethodGET('project-member-management/project-members/' + prjId);
  }

  findUserNonProjectMember() {
    return this.request.requestMethodGET('user-management/users/' + 'Y');
  }

  findAllUserByProjectId(prjId: number): Observable<any[]> {
    return new Observable(observer => {
      return this.request.requestMethodGET('user-management/users/project-id/' + prjId).subscribe(partner => {
        let atpPartners = []
        for (let obj of partner) {
          if(obj.officer){
            atpPartners.push({ userId: obj.userId, email: obj.email, fullName: obj.officer.firstNameTh + ' ' + obj.officer.lastNameTh });
          }
        }
        observer.next(atpPartners);
        return observer;
      });
    });
  }

  findByTaskId(taskId: number) {
    return this.request.requestMethodGET('taskpartner-management/taskpartner/' + taskId);
  }

  findNotMemberByProjectId(prjId: number, taskId: number) {
    return this.request.requestMethodGET('taskpartner-management/taskpartners/non-project-member/' + prjId + '/task-id/' + taskId);
  }

  findMemberByProjectId(prjId: number, taskId: number) {
    return this.request.requestMethodGET('taskpartner-management/taskpartners/project-member/' + prjId + '/task-id/' + taskId);
  }

  findAllUser(){
    return this.request.requestMethodGET('user-management/users/active-flag/A');
  }
}
