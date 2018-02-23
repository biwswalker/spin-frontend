import { Injectable } from "@angular/core";
import { HttpRequestService } from "./utils/http-request.service";

@Injectable()
export class OfficerService {

  constructor(private request: HttpRequestService) { }

  fetchOfficerAutocomplete(){

  }
}
