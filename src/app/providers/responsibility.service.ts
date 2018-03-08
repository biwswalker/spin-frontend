import { Injectable } from "@angular/core";
import { HttpRequestService } from "./utils/http-request.service";
import { Responsibility } from "../models/responsibility";
import { EventEmitter } from "@angular/core";

declare var SpinModal: any;
@Injectable()
export class ResponsibilityService {



  public modal = new SpinModal();
  public responsibility: EventEmitter<Responsibility> = new EventEmitter<Responsibility>();


  constructor(private request: HttpRequestService) {

  }


  emitResponsibility(value: Responsibility) {
    this.responsibility.emit(value);
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

  findByCriteria(key) {
    return this.request.requestMethodGET('responsibility-management/find-by-criteria/' + key);
  }

  onOpenModal() {
    this.modal.initial('#resp-modal', { show: true, backdrop: 'static', keyboard: true });
  }

  onCloseModal() {
    this.modal.close('#resp-modal');
  }


}









