import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Injectable()
export class MessageService {

  constructor() { }

  getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Request Sending...`;
      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `Request is ${percentDone}% uploaded.`;
      case HttpEventType.Response:
        return `Request was completely!`;
      default:
        return `Request surprising event: ${event.type}.`;
    }
  }
}
