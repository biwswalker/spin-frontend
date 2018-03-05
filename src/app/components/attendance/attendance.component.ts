import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  template: `<div class="row">
  <div class="col-12 col-md-6 col-lg-6 col-xl-5">
    <tasks></tasks>
  </div>
  <div class="col-12 col-md-6 col-lg-6 col-xl-7">
    <timestamp></timestamp>
  </div>
  <app-task-modal></app-task-modal>
</div>`,
})
export class AttendanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}
