import { Injectable } from "@angular/core";
declare var MessageNotify:any;
@Injectable()
export class EventMessagesService {

  private notify = new MessageNotify;
constructor(){

}

onSuccess(detail){
  this.notify.initialSuccess('บันทึกข้อมูลเรียบร้อย');
}

onInsertSuccess(detail){
  // this.notify.initialSuccess('บันทึกข้อมูลเรียบร้อย',detail);
}

onUpdateSuccess(detail){
  // this.notify.initialSuccess('บันทึกข้อมูลเรียบร้อย',detail);
}

onDeleteSuccess(detail){
  // this.notify.initialSuccess('บันทึกข้อมูลเรียบร้อย',detail);
}

onWarning(topic,detail){
  this.notify.initialSuccess(topic,detail);
}

notifySuccess(){
  this.notify.initialSuccess('', '')
}
}
