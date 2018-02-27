import { Injectable } from "@angular/core";
declare var MessageNotify:any;
@Injectable()
export class EventMessagesService {

  private notify = new MessageNotify;
constructor(){

}

onSuccess(){
  this.notify.initialSuccess('บันทึกข้อมูลเรียบร้อย','.........');
}

}
