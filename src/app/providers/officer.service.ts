import { Injectable, EventEmitter } from "@angular/core";
import { HttpRequestService } from "./utils/http-request.service";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user";

declare var SpinModal: any;
@Injectable()
export class OfficerService {

  public modal = new SpinModal();
  public key: EventEmitter<string> = new EventEmitter<string>();

  constructor(private request: HttpRequestService) { }

  fetchAllAutocomplete(activeFlag) {
    return this.request.requestMethodGET('user-management/users/active-flag/' + activeFlag);
  }
  fetchExceptMemberAutocomplete(activeFlag) {
    return this.request.requestMethodGET('user-management/users/' + activeFlag);
  }

  findAllPageable(page, size) {
    return this.request.requestMethodGET('officer-management/officers/?p=' + page + '&s=' + size);
  }

  findByCriteria(key, page, size) {
    return this.request.requestMethodGET('officer-management/officers/find-by-criteria/' + key + '?p=' + page + '&s=' + size);
  }

  findByOfficeId(officeId) {
    return this.request.requestMethodGET('officer-management/officers/' + officeId);
  }

  emitOfficer(value: string) {
    this.key.emit(value);
  }

  onOpenModal() {
    this.modal.initial('#officer-modal', { show: true, backdrop: 'static', keyboard: true });
  }

  onCloseModal() {
    this.modal.close('#officer-modal');
  }


}
