import { Injectable, EventEmitter } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

declare var SpinModal: any;
@Injectable()
export class HolidayService {

  public modal = new SpinModal();
  public key: EventEmitter<number> = new EventEmitter<number>();

  constructor(private request: HttpRequestService) { }

  emitHoliday(value: number) {
    this.key.emit(value);
  }

  findHolidayByMonth(year, month) {
    return this.request.requestMethodGET(`holiday-management/${year}/${month}`);
  }

  findByHolId(respId) {
    return this.request.requestMethodGET('holiday-management/holidays/' + respId);
  }


  findAllPageable(page, size) {
    return this.request.requestMethodGET('holiday-management/holidays/?p=' + page + '&s=' + size);
  }
  findByCriteria(key, page, size) {
    return this.request.requestMethodGET('holiday-management/holidays/find-by-criteria/' + key + '?p=' + page + '&s=' + size);
  }

  onOpenModal() {
    this.modal.initial('#holiday-modal', { show: true, backdrop: 'static', keyboard: true });
  }

  onCloseModal() {
    this.modal.close('#holiday-modal');
  }

  createHoliday(holiday) {
    return this.request.requestMethodPUT('holiday-management/holidays', holiday);
  }

  updateHoliday(holiday) {
    return this.request.requestMethodPOST('holiday-management/holidays', holiday);
  }

}
