import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

declare var SpinModal: any;
@Injectable()
export class DepartmentService {

  public modal = new SpinModal();
  public key: EventEmitter<number> = new EventEmitter<number>();

  constructor(private request: HttpRequestService) { }

  emitDepartment(value: number) {
    this.key.emit(value);
  }

  findByDeptId(respId) {
    return this.request.requestMethodGET('department-management/departments/' + respId);
  }


  findAllPageable(page, size) {
    return this.request.requestMethodGET('department-management/departments/?p=' + page + '&s=' + size);
  }
  findByCriteria(key, page, size) {
    return this.request.requestMethodGET('department-management/departments/find-by-criteria/' + key + '?p=' + page + '&s=' + size);
  }

  onOpenModal() {
    this.modal.initial('#department-modal', { show: true, backdrop: 'static', keyboard: true });
  }

  onCloseModal() {
    this.modal.close('#department-modal');
  }

  createDepartment(department) {
    return this.request.requestMethodPUT('department-management/departments', department);
  }

  updateDepartment(department) {
    return this.request.requestMethodPOST('department-management/departments', department);
  }


}
