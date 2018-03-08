import { Injectable } from "@angular/core";
import { HttpRequestService } from "./utils/http-request.service";

@Injectable()
export class ResponsibilityService {

  constructor(private request: HttpRequestService) {

  }

  fetchResponsibilityAutocomplete(activeFlag) {
    return this.request.requestMethodGET('/responsibility-management');
  }

  findAll() {
    return this.request.requestMethodGET('responsibility-management');
  }

  findByRespId(respId) {
    return this.request.requestMethodGET('responsibility-management/' + respId);
  }


}









