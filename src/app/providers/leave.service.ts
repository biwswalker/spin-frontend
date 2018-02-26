import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

@Injectable()
export class LeaveService {

  constructor(private request: HttpRequestService) { }

  findLeaveByMonth(year, month){
    return this.request.requestMethodGET(`leave-management/${year}/${month}`);
  }

}
