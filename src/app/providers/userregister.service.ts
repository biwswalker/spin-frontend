import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

declare var SpinModal: any;
@Injectable()
export class UserRegisterService {
  private result: any;
  public modal = new SpinModal();
  constructor(private request: HttpRequestService) {}

  findAll(activeFlag, page, size) {
    return this.request.requestMethodGET(
      "user-management/users/active-flag/" +
        activeFlag +
        "?p=" +
        page +
        "&s=" +
        size
    );
  }

  findAllByCriteria(term, page, size) {
    return this.request.requestMethodGET(
      "user-management/find-by-criteria/" + term + "?p=" + page + "&s=" + size
    );
  }

  findByUserId(userId) {
    return this.request.requestMethodGET("user-management/users/" + userId);
  }

  findByOfficerId(officerId) {
    console.log(officerId);
    return this.request.requestMethodGET(
      "officer-management/officers/" + officerId
    );
  }

  onOpenModal() {
    this.modal.initial("#user-modal", {
      show: true,
      backdrop: "static",
      keyboard: true
    });
  }

  onCloseModal() {
    this.modal.close("#user-modal");
  }
}

