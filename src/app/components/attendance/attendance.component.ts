import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  template: `<div class="row">
  <div class="col-12 col-md-6 col-lg-6">
    <tasks></tasks>
  </div>
  <div class="col-12 col-md-6 col-lg-6">
    <timestamp></timestamp>
  </div>
</div>`,
})
export class AttendanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}
