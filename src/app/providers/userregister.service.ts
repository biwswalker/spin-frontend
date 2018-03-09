import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

@Injectable()
export class UserRegisterService {
  private result: any;
  constructor(private request: HttpRequestService) { }

  findAll(activeFlag, page, size) {
   return this.request.requestMethodGET('user-management/users/active-flag/' + activeFlag + '?p=' + page + '&s=' + size);
  }

  findByUserId(userId) {
    console.log(userId);
    return this.request.requestMethodGET('user-management/users/' + userId);
  }

}

