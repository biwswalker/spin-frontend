
import { Officer } from './../models/officer';
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

  findDepartmentByKeyword(keyword) {
    return this.request.requestMethodGET('/department-management/departments/find-by-keyword/' + keyword);
  }

  findPositionByKeyword(keyword) {
    return this.request.requestMethodGET('/position-management/positions/find-by-keyword/' + keyword);
  }


  getDataObservable(key1, key2): Observable<any> {
    // console.log('getDataObservable');
    // ดึงข้อมูล department ทั้งหมด
    const department = this.findDepartmentByKeyword(key1);

    // ดึงข้อมูล position ทั้งหมด
    const position = this.findPositionByKeyword(key2);


    return Observable.forkJoin(department, position);
  }

  onSentData(value) {

  }

}
