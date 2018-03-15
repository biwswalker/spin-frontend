import { Component, AfterViewInit } from '@angular/core';
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
declare var $: any;
@Component({
  selector: 'task-day',
  templateUrl: './task-day.component.html',
  styleUrls: ['./task-day.component.scss']
})
export class TaskDayComponent implements AfterViewInit {


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
  }

  ngAfterViewInit(): void {
    // Toggle
    $("button.dp-btn-collapse").click(function () {
      $("button.dp-btn-collapse > i").toggle();
      if ($('#toggle-calendar').hasClass('collapsed')) {
        $('.day-tasks-list').css({ "height": "240px" });
      } else {
        $('.day-tasks-list').css({ "height": "500px" });
      }
    });

    // Call DatePicker
    let datepickerId = '#workingDatePicker'
    let self = this;
    $(datepickerId).datepicker({
      todayHighlight: true,
      beforeShowDay: function (date) {
        let dates = new Date(date);
        let monthDate = self.utilsService.convertEnDateToTh(self.utilsService.convertDateToEnStringDate(dates));
        for (let hol of self.holidays) {
          if (hol.holDate == monthDate) {
            return { enabled: true, classes: 'holiday', tooltip: hol.holName };
          }
        }
        for (let unstamp of self.unstamped) {
          if (unstamp == monthDate) {
            return { enabled: true, classes: 'unstamped', tooltip: 'คุณไม่ได้ลงเวลางาน' };
          }
        }
        for (let leave of self.leaves) {
          if (leave.leaveDate == monthDate) {
            return { enabled: true, classes: 'leave', tooltip: 'ลา' };
          }
        }
        return { enabled: true, tooltip: '' };
      }
    });


    $(datepickerId).datepicker().on('changeDate', function (dateText) {
      let pickerdate = new Date(dateText.date);
      self.subjectDate.next(self.utilsService.convertEnDateToTh(self.utilsService.convertDateToEnStringDate(pickerdate)));
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
    Observable.forkJoin(unstampedFetch, holidaysFetch, leavesFetch).subscribe(successes => {}, err => {}, () => {
      $('#workingDatePicker').datepicker('refresh');
    })
  }
}