import { Injectable, EventEmitter } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

declare var SpinModal: any;
@Injectable()
export class TagService {

  public modal = new SpinModal();
  public key: EventEmitter<number> = new EventEmitter<number>();
  constructor(private request: HttpRequestService) { }

  findUsedTag() {
    return this.request.requestMethodGET('tag-management/tags');
  }

  findAll() {
    return this.request.requestMethodGET('tag-management/tags/active-flag/A');
  }

  findByTaskId(taskId: Number) {
    return this.request.requestMethodGET('tasktag-management/tasktags/' + taskId);
  }

  findByUserId(){
    return this.request.requestMethodGET('tag-management/tags')
  }

  findAllPageable(page, size) {
    return this.request.requestMethodGET(
      "tag-management/tags/all/?p=" + page + "&s=" + size
    );
  }

  findByCriteria(key, page, size) {
    return this.request.requestMethodGET(
      "tag-management/tags/find-by-criteria/" +
      key +
      "?p=" +
      page +
      "&s=" +
      size
    );
  }

  findByTagId(tagId) {
    return this.request.requestMethodGET(
      "tag-management/tags/" + tagId
    );
  }

  emitTag(value: number) {
    this.key.emit(value);
  }

  onOpenModal() {
    this.modal.initial("#tag-modal", {
      show: true,
      backdrop: "static",
      keyboard: true
    });
  }

  onCloseModal() {
    this.modal.close("#tag-modal");
  }
  createTag(tag) {
    return this.request.requestMethodPUT(
      "tag-management/tags",
      tag
    );
  }

  updateTag(tag) {
    return this.request.requestMethodPOST(
      "tag-management/tags",
      tag
    );
  }

}
