import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

@Injectable()
export class HolidayService {

  constructor(private request: HttpRequestService) { }

  findHolidayByMonth(year, month){
    return this.request.requestMethodGET(`holiday-management/${year}/${month}`);
  }

}
