import { Injectable } from "@angular/core";
import { HttpRequestService } from "./utils/http-request.service";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user";

@Injectable()
export class OfficerService {

  constructor(private request: HttpRequestService) { }

  fetchAllAutocomplete(activeFlag){
    return this.request.requestMethodGET('user-management/users/active-flag/'+activeFlag);
  }
  fetchExceptMemberAutocomplete(activeFlag){
    return this.request.requestMethodGET('user-management/users/'+activeFlag);
  }
}
