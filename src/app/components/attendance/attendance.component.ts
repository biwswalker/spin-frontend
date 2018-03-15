import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-attendance',
  template: `<div class="row" style="padding-top: 15px;">
  <div class="col-12 col-md-6 col-lg-6 col-xl-5 exbox">
  <div class="box">
  <tasks></tasks>
    </div>
  </div>
  <div class="col-12 col-md-6 col-lg-6 col-xl-7 exbox">
  <div class="box">
    <timestamp></timestamp>
    </div>
  </div>
</div>
<task-modal  (onCompleteEmit)="insertComplete($event)"></task-modal>`,
  styles: ['.box { background-color: #fff; padding: 1rem; border-radius: 5px; webkit-box-shadow: 2px 1px 3px 2px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); box-shadow: 2px 1px 3px 2px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); } .exbox {padding-left:5px;padding-right:5px;}']
})
export class AttendanceComponent implements OnInit {

  @ViewChild(TaskComponent) tasksChild;
  constructor() { }

  ngOnInit() {

  }

  insertComplete(event){
    this.tasksChild.onInsertTaskCompleted(event);
  }
}
