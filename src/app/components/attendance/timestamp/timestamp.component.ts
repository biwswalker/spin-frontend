import { Component, OnInit, ViewChild } from '@angular/core';
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
  <div class="nowdate text-truncate" *ngIf="nowView === 'day'">ลงเวลาทำงาน</div>
  <div class="nowdate text-truncate" *ngIf="nowView === 'week'">{{ dateDisplay }} {{year}}</div>
  <!--<div class="nowdate text-truncate" *ngIf="nowView === 'day'">{{ enDateStr | thaiDate:'stamptable' }}</div>
  <div class="nowdate text-truncate" *ngIf="nowView === 'week'">{{ firstDOW | thaiDate:'short' }} - {{ endDOW | thaiDate:'short' }}</div>-->
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

  public nowView = 'day';
  public enDateStr = '';
  public firstDOW = '';
  public endDOW = '';
  public dateDisplay = '';
  constructor(private utilsService: UtilsService, private taskService: TaskService) { }

  ngOnInit() {
    this.enDateStr = this.utilsService.getCurrentEnDate();
    if (this.nowView === 'week') {
      this.firstDOW = this.utilsService.getStartOfWeek(this.enDateStr, true);
      this.endDOW = this.utilsService.getEndOfWeek(this.enDateStr, true);
      this.displayMonthWord(this.firstDOW, this.endDOW);
    }
    this.taskService.changeTimetableDate(this.enDateStr);
  }

  onChangeDate(control) {
    let oldEnDate = this.enDateStr;
    let oldFirstDOW = this.firstDOW;
    let oldEndDOW = this.endDOW;
    if (control === 'next') {
      if (this.nowView === 'day') {
        this.enDateStr = this.utilsService.getNextDay(oldEnDate);
        this.taskService.changeTimetableDate(this.enDateStr);
      }
      if (this.nowView === 'week') {
        let nxtWeek = this.utilsService.getNextDay(oldEndDOW);
        let thNxtWeek = this.utilsService.convertThDateToEn(nxtWeek);
        this.firstDOW = this.utilsService.getStartOfWeek(thNxtWeek, true);
        this.endDOW = this.utilsService.getEndOfWeek(thNxtWeek, true);
        this.taskService.changeTimetableDOW({ start: this.firstDOW, end: this.endDOW })
        this.displayMonthWord(this.firstDOW, this.endDOW);
      }
    } else if (control === 'prev') {
      if (this.nowView === 'day') {
        this.enDateStr = this.utilsService.getPreviousDay(oldEnDate);
        this.taskService.changeTimetableDate(this.enDateStr);
      }
      if (this.nowView === 'week') {
        let prevWeek = this.utilsService.getPreviousDay(oldFirstDOW);
        let thPrevWeek = this.utilsService.convertThDateToEn(prevWeek);
        this.firstDOW = this.utilsService.getStartOfWeek(thPrevWeek, true);
        this.endDOW = this.utilsService.getEndOfWeek(thPrevWeek, true);
        this.taskService.changeTimetableDOW({ start: this.firstDOW, end: this.endDOW });
        this.displayMonthWord(this.firstDOW, this.endDOW);
      }
    } else {
      this.enDateStr = this.utilsService.getCurrentEnDate();
      if (this.nowView === 'week') {
        this.firstDOW = this.utilsService.getStartOfWeek(this.enDateStr, true);
        this.endDOW = this.utilsService.getEndOfWeek(this.enDateStr, true);
        this.taskService.changeTimetableDOW({ start: this.firstDOW, end: this.endDOW });
        this.displayMonthWord(this.firstDOW, this.endDOW);
      } else {
        this.taskService.changeTimetableDate(this.enDateStr);
      }
    }
  }

  onChangeView(control) {
    this.nowView = control;
    this.enDateStr = this.utilsService.getCurrentEnDate();
    if (this.nowView === 'day') {
      this.taskService.changeTimetableDate(this.enDateStr);
    }
    if (this.nowView === 'week') {
      this.firstDOW = this.utilsService.getStartOfWeek(this.enDateStr, true);
      this.endDOW = this.utilsService.getEndOfWeek(this.enDateStr, true);
      this.taskService.changeTimetableDOW({ start: this.firstDOW, end: this.endDOW });
      this.displayMonthWord(this.firstDOW, this.endDOW);
    }
  }

  changeSelectedDate(date) {
    this.enDateStr = date;
    this.nowView = 'day';
    this.taskService.changeTimetableDate(this.enDateStr);
  }

  displayMonthWord(startThDate, endThDate) {
    let stateMonthWord = this.utilsService.getThMonthShortWord(this.utilsService.convertThDateToEn(startThDate));
    let stateYear = this.utilsService.getThYearDate(startThDate);
    if (endThDate) {
      let endMonthWord = this.utilsService.getThMonthShortWord(this.utilsService.convertThDateToEn(endThDate));
      let endYear = this.utilsService.getThYearDate(startThDate);
      if (stateMonthWord !== endMonthWord) {
        this.dateDisplay = `${stateMonthWord} ${stateYear} - ${endMonthWord} ${endYear}`
      } else {
        this.dateDisplay = `${stateMonthWord} ${stateYear}`
      }
    } else {
      this.dateDisplay = `${stateMonthWord} ${stateYear}`
    }
  }
}
