import { Injectable } from "@angular/core";
import { HttpRequestService } from "./utils/http-request.service";

@Injectable()
export class OfficerService {

  constructor(private request: HttpRequestService) { }

  fetchAllAutocomplete(activeFlag){
    return this.request.requestMethodGET('user-management/users/${activeFlag}');
  }
  fetchExceptMemberAutocomplete(activeFlag){
    return this.request.requestMethodGET('user-management/users/${activeFlag}');
  }
}
