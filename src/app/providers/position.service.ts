import { Injectable, EventEmitter } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

declare var SpinModal: any;
@Injectable()
export class PositionService {

  public modal = new SpinModal();
  public key: EventEmitter<number> = new EventEmitter<number>();

  constructor(private request: HttpRequestService) { }

  emitPosition(value: number) {
    this.key.emit(value);
  }

  findByPositionId(positionId) {
    return this.request.requestMethodGET('position-management/positions/' + positionId);
  }


  findAllPageable(page, size) {
    return this.request.requestMethodGET('position-management/positions/?p=' + page + '&s=' + size);
  }
  findByCriteria(key, page, size) {
    return this.request.requestMethodGET('position-management/positions/find-by-criteria?term=' + key + '&p=' + page + '&s=' + size);
  }

  onOpenModal() {
    this.modal.initial('#position-modal', { show: true, backdrop: 'static', keyboard: true });
  }

  onCloseModal() {
    this.modal.close('#position-modal');
  }

  createPosition(department) {
    return this.request.requestMethodPUT('position-management/positions', department);
  }

  updatePosition(department) {
    return this.request.requestMethodPOST('position-management/positions', department);
  }

}
