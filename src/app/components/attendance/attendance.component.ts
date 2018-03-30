import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { TimestampComponent } from './timestamp/timestamp.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  template: `<div class="row">
  <div class="col-12">
        <div class="page-title d-flex">
            <h2 class="d-inline-block">เวลาทำงาน</h2>
            <button type="button" id="btn-person-report"
            class="btn btn-link p-0 ml-auto"
            (click)="onClickPersonReport()">
            <i class="fas fa-file-alt"></i>
            รายงานการทำงาน
          </button>
        </div>
  </div>
  <div class="col-12 col-md-6 col-lg-6 col-xl-5 content-left">
  <div class="box">
  <tasks (onSelectUnstamped)="isDateUnstamped($event)"></tasks>
    </div>
  </div>
  <div class="col-12 col-md-6 col-lg-6 col-xl-7 content-right">
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
  @ViewChild(TimestampComponent) timestampChild;
  constructor(private router: Router) { }

  ngOnInit() {

  }

  insertComplete(event) {
    this.tasksChild.onInsertTaskCompleted(event);
  }

  isDateUnstamped(date) {
    this.timestampChild.changeSelectedDate(date);
  }

  onClickPersonReport() {
    this.router.navigateByUrl('report/person');
  }
}
