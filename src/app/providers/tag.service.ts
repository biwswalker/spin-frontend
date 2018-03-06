import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

@Injectable()
export class TagService {

  constructor(private request: HttpRequestService) { }

  findUsedTag(){
    return this.request.requestMethodGET('tag-management/tags');
  }

  findAll(){
    return this.request.requestMethodGET('tag-management/tags/active-flag/A');
  }

  findByTaskId(taskId: Number){
    return this.request.requestMethodGET('tasktag-management/tasktags/' + taskId);
  }
}
