import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

declare var SpinModal: any;
@Injectable()
export class UserRegisterService {
  private result: any;
  public modal = new SpinModal();
  public key: EventEmitter<string> = new EventEmitter<string>();

  constructor(private request: HttpRequestService) {}

  findAll(activeFlag, page, size) {
    return this.request.requestMethodGET(
      "user-management/users/all/active-flag/" +
        activeFlag +
        "?p=" +
        page +
        "&s=" +
        size
    );
  }

  findAllByCriteria(term, page, size) {
    return this.request.requestMethodGET(
      "user-management/find-by-criteria?term=" + term + "&p=" + page + "&s=" + size
    );
  }

  findByUserId(userId) {
    return this.request.requestMethodGET(
      "user-management/users/" + userId.replace(".", "-")
    );
  }

  findByOfficerId(officerId) {
    return this.request.requestMethodGET(
      "officer-management/officers/" + officerId
    );
  }

  onCloseModal() {
    this.modal.close("#user-modal");
  }
  onOpenModal() {
    this.modal.initial("#user-modal", {
      show: true,
      backdrop: "static",
      keyword: true
    });
  }

  emit(value: string) {
    this.key.emit(value);
  }

  createUser(user) {
    user.activeFlag = this.convertActiveFlag(user.activeFlag);
    user.userPwd = "";
    user.faildCount = 0;
    return this.request.requestMethodPUT("user-management/users", user);
  }

  updateUser(user) {
    return this.request.requestMethodPOST("user-management/users", user);
  }

  convertActiveFlag(activeFlag) {
    if (activeFlag === "true") {
      return "A";
    } else {
      return "I";
    }
  }

  getDataObservable(officeId): Observable<any> {
    console.log(officeId);
    const officer = this.findByOfficerId(officeId);
    return Observable.forkJoin(officer);
  }

  uploadExcel(users) {
    return this.request.requestMethodPUT("user-management/users/upload-excel",users);
  }
}

