import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../../providers/task.service';
import { Observable } from 'rxjs/Observable';
import { TaskForm } from '../../../../forms/task-form';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HolidayService } from '../../../../providers/holiday.service';
import { Holiday } from '../../../../models/holiday';
import { Leave } from '../../../../models/leave';
import { LeaveService } from '../../../../providers/leave.service';
import { AuthenticationService } from '../../../../providers/authentication.service';
import { Task } from '../../../../models/task';
declare var $: any;
@Component({
  selector: 'task-day',
  templateUrl: './task-day.component.html',
  styleUrls: ['./task-day.component.scss']
})
export class TaskDayComponent implements AfterViewInit {

  @Output() changeDateEvent = new EventEmitter<string>();
  private subjectDate = new BehaviorSubject<string>(this.utilsService.getCurrentThDate());
  private crrDate = this.subjectDate.asObservable();
  private subjectYearMonth = new BehaviorSubject<{}>({ year: this.utilsService.getCuurentThYear(), month: this.utilsService.getCurrentThMonth() });
  private crrYearMonth = this.subjectYearMonth.asObservable();

  public taskForms = new Observable<TaskForm[]>();
  private unstamped = [];
  private holidays: Holiday[] = [];
  private leaves: Leave[] = [];

  constructor(private taskService: TaskService, private utilsService: UtilsService, private holidayService: HolidayService, private leaveService: LeaveService, private auth: AuthenticationService) {
    // Async
    this.crrDate.subscribe(date => {
      this.taskForms = this.taskService.findTaskByDate(date);
    });

    this.crrYearMonth.subscribe((yearMonth: any) => {
      const year = yearMonth.year!;
      const month = yearMonth.month!;
      this.fetchSpecialDate(year, month)
    });
    // End Async
  }

  onTaskCompleted(date) {
    this.subjectDate.next(date);
    let enDate = this.utilsService.convertThDateToEn(date)
    let month = this.utilsService.getThMonth(enDate);
    let year = this.utilsService.getThYear(enDate);
    this.fetchSpecialDate(year, month)
  }

  ngAfterViewInit(): void {
    // Toggle
    $("button.dp-btn-collapse").click(function () {
      $("button.dp-btn-collapse > i").toggle();
    });

    // Call DatePicker
    let datepickerId = '#workingDatePicker'
    let self = this;
    $(datepickerId).datepicker({
      todayHighlight: true,
      beforeShowDay: function (date) {
        let dates = new Date(date);
        let monthDate = self.utilsService.convertEnDateToTh(self.utilsService.convertDateToEnStringDate(dates));
        // Get Spacial Date
        let isHoliday = self.holidays.find(hol => hol.holDate == monthDate);
        let isUnstamped = self.unstamped.find(unstamped => unstamped == monthDate);
        let isLeave = self.leaves.find(leave => leave.leaveDate == monthDate);
        // Set Spacial Date
        if (isHoliday) {
          return { enabled: true, classes: 'holiday', tooltip: isHoliday.holName };
        } else if (isUnstamped) {
          return { enabled: true, classes: 'unstamped', tooltip: 'คุณไม่ได้ลงเวลางาน' };
        } else if (isLeave) {
          return { enabled: true, classes: 'leave', tooltip: 'ลา' };
        } else {
          if (dates.getDay() === 0 || dates.getDay() === 6) {
            return { enabled: true, classes: 'week-end', tooltip: ' ' };
          } else {
            return { enabled: true, tooltip: ' ' };
          }
        }
      }
    });


    $(datepickerId).datepicker().on('changeDate', function (dateText) {
      self.taskService.chageSelectedTask(new Task());
      let pickerdate = new Date(dateText.date);
      let enDate = self.utilsService.convertDateToEnStringDate(pickerdate)
      let thDate = self.utilsService.convertEnDateToTh(enDate)
      let isUnstamped = self.unstamped.find(unstampedDate => unstampedDate === thDate);
      self.subjectDate.next(thDate);
      if (isUnstamped) {
        self.changeDateEvent.emit(enDate);
      }
    });
    $(datepickerId).datepicker().on('changeMonth', function (dateText) {
      let pickerdate = new Date(dateText.date);
      let thYear = self.utilsService.convertToThYear(pickerdate.getFullYear());
      let thMoth = self.utilsService.convertNumberTo2Deci(pickerdate.getMonth() + 1);
      self.subjectYearMonth.next({ year: thYear, month: thMoth })
    });
    $(datepickerId).datepicker().on('changeYear', function (dateText) {
    });
    // Sets stye
    $(datepickerId).addClass('w-100');
    $($(datepickerId).find('.datepicker-inline')).addClass('w-100');
    $($(datepickerId).find('.datepicker-inline table')).addClass('w-100');
    $($(datepickerId).find('.datepicker-inline')).css({ 'margin-left': 'auto', 'margin-right': 'auto' });
    // End Call DatePicker
  }

  fetchSpecialDate(year, month) {
    // Get Unstamped
    let self = this;
    let unstampedFetch = this.taskService.findUnStamped(year, month).map(unstampeds => {
      this.unstamped = [];
      this.unstamped = unstampeds;
      console.log(this.unstamped)
    });

    // Get Holiday
    let holidaysFetch = this.holidayService.findHolidayByMonth(year, month).map((holidays: Holiday[]) => {
      this.holidays = [];
      for (let hol of holidays) {
        if (hol.activeFlag == 'A') {
          this.holidays.push(hol);
        }
      }
    });

    // Get Leave
    let leavesFetch = this.leaveService.findLeaveByMonth(year, month).map((leaves: Leave[]) => {
      this.leaves = [];
      for (let leave of leaves) {
        if (leave.activeFlag == 'A') {
          this.leaves.push(leave);
        }
      }
    });
    Observable.forkJoin(unstampedFetch, holidaysFetch, leavesFetch).subscribe(successes => { }, err => { }, () => {
      $('#workingDatePicker').datepicker('refresh');
    })
  }
}
