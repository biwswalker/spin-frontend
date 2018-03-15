import { Injectable } from "@angular/core";
declare var MessageNotify: any;
@Injectable()
export class EventMessagesService {

  private notify = new MessageNotify;
  constructor() {

  }

  onInsertSuccess(detail) {
    this.notify.initialSuccess('บันทึกข้อมูลเรียบร้อย', detail);
  }

  onUpdateSuccess(detail) {
    this.notify.initialSuccess('แก้ไขข้อมูลเรียบร้อย', detail);
  }

  onDeleteSuccess(detail) {
    this.notify.initialSuccess('ลบข้อมูลเรียบร้อย', detail);
  }

  onWarning(detail) {
    this.notify.initialWarning('แจ้งเตือน', detail);
  }

  onInsertError(detail) {
    this.notify.initialError('เกิดข้อผิดพลาด', detail.error.details);
  }
  onUpdateError(detail) {
    this.notify.initialError('เกิดข้อผิดพลาด', detail.error.details);
  }
  onUploadError(detail) {
    this.notify.initialError('เกิดข้อผิดพลาด พบข้อมูลไม่สมบูรณ์', detail);
  }


}
