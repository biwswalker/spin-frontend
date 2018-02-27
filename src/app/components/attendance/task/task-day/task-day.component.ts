import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { TaskService } from '../../../../providers/task.service';
import { Observable } from 'rxjs/Observable';
import { TaskForm } from '../../../../forms/task-form';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HolidayService } from '../../../../providers/holiday.service';
import { Holiday } from '../../../../models/holiday';
import { Leave } from '../../../../models/leave';
import { LeaveService } from '../../../../providers/leave.service';
declare var $: any;

@Component({
  selector: 'task-day',
  templateUrl: './task-day.component.html',
  styleUrls: ['./task-day.component.scss']
})
export class TaskDayComponent implements OnInit, AfterViewInit, AfterViewChecked {


  private subjectDate = new BehaviorSubject<string>(this.utilsService.getCurrentThDate());
  private crrDate = this.subjectDate.asObservable();
  private subjectYearMonth = new BehaviorSubject<{}>({ year: this.utilsService.getCuurentThYear(), month: this.utilsService.getCurrentThMonth() });
  private crrYearMonth = this.subjectYearMonth.asObservable();

  public taskForms = new Observable<TaskForm[]>();
  private unstamped = [];
  private holidays: Holiday[] = [];
  private leaves: Leave[] = [];

  private mrg = 0;

  constructor(private taskService: TaskService, private utilsService: UtilsService, private holidayService: HolidayService, private leaveService: LeaveService) {
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

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $("button.dp-btn-collapse").click(function () {
      $("button.dp-btn-collapse > i").toggle();
    });
    // Call DatePicker
    let datepickerId = '#workingDatePicker'
    let self = this;
    $(datepickerId).datepicker({
      isBE: true,
      onSelect: function (dateText, inst) {
        self.subjectDate.next(dateText);
        $('.inline-picker > .ui-datepicker td').css({ 'margin-left': this.mrg + 'px', 'margin-right': this.mrg + 'px' })
        $('.inline-picker > .ui-datepicker th').css({ 'margin-left': this.mrg + 'px', 'margin-right': this.mrg + 'px' })
      },
      beforeShowDay: function (date) {
        var dpInlineWidth = $('#workingDatePicker').width();
        self.mrg = ((dpInlineWidth / 7) / 2) - 19;
        let monthDate = self.utilsService.convertEnDDMYYYYToThDate(date.getDate(), date.getMonth() + 1, date.getFullYear())
        for (let hol of self.holidays) {
          if (hol.holDate == monthDate) {
            return [true, 'holiday', hol.holName];
          }
        }

        for (let unstamp of self.unstamped) {
          if (unstamp == monthDate) {
            return [true, 'unstamped', 'คุณไม่ได้ลงเวลางาน'];
          }
        }

        for (let leave of self.leaves) {
          if (leave.leaveDate == monthDate) {
            return [true, 'leave', 'ลา'];
          }
        }
        return [true];
      },
      onChangeMonthYear: function (year, month, inst) {
        let thYear = self.utilsService.convertToThYearStr(year);
        let thMoth = self.utilsService.convertNumberTo2Deci(month);
        // Get SpecialDate
        self.subjectYearMonth.next({ year: thYear, month: thMoth })
      }
    });
    // Sets stye
    $(datepickerId).addClass('w-100');
    $($(datepickerId).find('.ui-datepicker-inline')).addClass('w-100');
    $($(datepickerId).find('.ui-datepicker-inline')).css({ 'margin-left': 'auto', 'margin-right': 'auto' });
    // End Call DatePicker
  }

  ngAfterViewChecked() {
    $('.inline-picker > .ui-datepicker td').css({ 'margin-left': this.mrg + 'px', 'margin-right': this.mrg + 'px' })
    $('.inline-picker > .ui-datepicker th').css({ 'margin-left': this.mrg + 'px', 'margin-right': this.mrg + 'px' })
  }

  fetchSpecialDate(year, month) {
    // Get Unstamped
    this.taskService.findUnStamped(year, month).subscribe(unstampeds => {
      this.unstamped = [];
      this.unstamped = unstampeds;
      $('#workingDatePicker').datepicker('refresh');
    });

    // Get Holiday
    this.holidayService.findHolidayByMonth(year, month).subscribe((holidays: Holiday[]) => {
      this.holidays = [];
      for (let hol of holidays) {
        if (hol.activeFlag == 'A') {
          this.holidays.push(hol);
        }
      }
      $('#workingDatePicker').datepicker('refresh');
    });

    // Get Leave
    this.leaveService.findLeaveByMonth(year, month).subscribe((leaves: Leave[]) => {
      this.leaves = [];
      for (let leave of leaves) {
        if (leave.activeFlag == 'A') {
          this.leaves.push(leave);
        }
      }
      $('#workingDatePicker').datepicker('refresh');
    });

  }
}