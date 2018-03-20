import { Injectable } from "@angular/core";
import { HttpRequestService } from "./utils/http-request.service";
import { Responsibility } from "../models/responsibility";
import { EventEmitter } from "@angular/core";

declare var SpinModal: any;
@Injectable()
export class ResponsibilityService {



  public modal = new SpinModal();
  public key: EventEmitter<number> = new EventEmitter<number>();

  constructor(private request: HttpRequestService) {

  }

  emitResponsibility(value: number) {
    this.key.emit(value);
  }

  fetchResponsibilityAutocomplete(activeFlag) {
    return this.request.requestMethodGET('responsibility-management/responsibilities');
  }

  findAll() {
    return this.request.requestMethodGET('responsibility-management/responsibilities');
  }

  findByRespId(respId) {
    return this.request.requestMethodGET('responsibility-management/responsibilities/' + respId);
  }


  findAllPageable(page, size) {
    return this.request.requestMethodGET('responsibility-management/responsibilities/?p=' + page + '&s=' + size);
  }
  findByCriteria(key, page, size) {
    return this.request.requestMethodGET('responsibility-management/responsibilities/find-by-criteria/' + key + '?p=' + page + '&s=' + size);
  }

  onOpenModal() {
    this.modal.initial('#resp-modal', { show: true, backdrop: 'static', keyboard: true });
  }

  onCloseModal() {
    this.modal.close('#resp-modal');
  }

  createResponsibility(responsibility) {
    return this.request.requestMethodPUT('responsibility-management/responsibilities', responsibility);
  }

  updateResponsibility(responsibility) {
    return this.request.requestMethodPOST('responsibility-management/responsibilities', responsibility);
  }


}









