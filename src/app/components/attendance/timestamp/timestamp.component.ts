import { Component, OnInit, ViewChild } from '@angular/core';
import { TimetableDayComponent } from './timetable-day/timetable-day.component';
import { UtilsService } from '../../../providers/utils/utils.service';

@Component({
  selector: 'timestamp',
  template: `
<div class="btn-toolbar justify-content-between mb-2" role="toolbar">
  <div class="btn-group" role="group" >
  <button type="button"
  class="btn btn-sm btn-outline-secondary" (click)="onChangeDate('prev')"><i class="fas fa-chevron-left"></i></button>
<button type="button"
  class="btn btn-sm btn-outline-secondary" (click)="onChangeDate('')">วันนี้</button>
<button type="button"
  class="btn btn-sm btn-outline-secondary" (click)="onChangeDate('next')"><i class="fas fa-chevron-right"></i></button>
  </div>
  <div class="btn-group" role="group" >
  <button type="button"
  class="btn btn-sm btn-outline-secondary active" (click)="onChangeView('day')">วัน</button>
<button type="button"
  class="btn btn-sm btn-outline-secondary" (click)="onChangeView('week')">สัปดาห์</button>
  </div>
</div>
  <timetable-day></timetable-day>`,
  styleUrls: ['./timestamp.component.scss']
})
export class TimestampComponent implements OnInit {

  @ViewChild(TimetableDayComponent) timetableDayChild;

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
  }

  onChangeDate(control) {
    let oldEnDate = this.timetableDayChild.enDateStr;
    if (control === 'next') {
      this.timetableDayChild.subjectDate.next(this.utilsService.getNextDay(oldEnDate));
    } else if (control === 'prev') {
      this.timetableDayChild.subjectDate.next(this.utilsService.getPreviousDay(oldEnDate));
    } else {
      this.timetableDayChild.subjectDate.next(this.utilsService.getCurrentEnDate());
    }
  }

  onChangeView(control){

  }

}
