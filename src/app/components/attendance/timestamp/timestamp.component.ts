import { Component, OnInit, ViewChild } from '@angular/core';
import { TimetableDayComponent } from './timetable-day/timetable-day.component';
import { UtilsService } from '../../../providers/utils/utils.service';
import { TaskService } from '../../../providers/task.service';

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
  <div class="nowdate">{{ enDateStr | thaiDate:'stamptable' }}</div>
  <div class="btn-group" role="group" >
  <button type="button"
  class="btn btn-sm btn-outline-secondary" [ngClass]="nowView === 'day' ? 'active' : ''" (click)="onChangeView('day')">วัน</button>
<button type="button"
  class="btn btn-sm btn-outline-secondary" [ngClass]="nowView === 'week' ? 'active' : ''" (click)="onChangeView('week')">สัปดาห์</button>
  </div>
</div>
  <timetable-day *ngIf="nowView === 'day'"></timetable-day>
  <timetable-week *ngIf="nowView === 'week'"></timetable-week>
  `,
  styles: ['.nowdate { padding-top: 5px; }']
})
export class TimestampComponent implements OnInit {

  @ViewChild(TimetableDayComponent) timetableDayChild;

  public nowView = 'day';
  public enDateStr = '';

  constructor(private utilsService: UtilsService, private taskService: TaskService) { }

  ngOnInit() {
    this.enDateStr = this.utilsService.getCurrentEnDate();
  }

  onChangeDate(control) {
    let oldEnDate = this.timetableDayChild.enDateStr;
    if (control === 'next') {
      this.enDateStr = this.utilsService.getNextDay(oldEnDate);
      this.taskService.changeTimetableDate(this.enDateStr);
    } else if (control === 'prev') {
      this.enDateStr = this.utilsService.getPreviousDay(oldEnDate);
      this.taskService.changeTimetableDate(this.enDateStr);
    } else {
      this.enDateStr = this.utilsService.getCurrentEnDate();
      this.taskService.changeTimetableDate(this.enDateStr);
    }
  }

  onChangeView(control) {
    this.nowView = control;
  }

}
