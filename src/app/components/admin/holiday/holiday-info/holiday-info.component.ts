import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Holiday } from '../../../../models/holiday';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { HolidayService } from '../../../../providers/holiday.service';
import { HolidayProcessComponent } from '../holiday-process/holiday-process.component';

declare var $: any;
declare var inlineDatepicker: any;
@Component({
  selector: 'app-holiday-info',
  templateUrl: './holiday-info.component.html',
  styleUrls: ['./holiday-info.component.scss']
})
export class HolidayInfoComponent implements OnInit {

  private subjectDate = new BehaviorSubject<string>(this.utilsService.getCurrentThDate());
  private crrDate = this.subjectDate.asObservable();
  private subjectYearMonth = new BehaviorSubject<{}>({ year: this.utilsService.getCuurentThYear(), month: this.utilsService.getCurrentThMonth() });
  private crrYearMonth = this.subjectYearMonth.asObservable();

  public holidays: Holiday[] = [];


  @ViewChild(HolidayProcessComponent) holidayProcess;


  constructor(private utilsService: UtilsService, private holidayService: HolidayService) {

    // Async

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
    console.log('ngAfterViewInit');
    // Call DatePicker
    let datepickerId = '#workingDatePicker'
    let self = this;
    console.log('self =' + datepickerId);
    $(datepickerId).datepicker({
      isBE: true,
      onSelect: function (dateText, inst) {
        console.log('dateText = ' + dateText);
        self.subjectDate.next(dateText);
      },
      beforeShowDay: function (date) {
        let monthDate = self.utilsService.convertEnDDMYYYYToThDate(date.getDate(), date.getMonth() + 1, date.getFullYear())
        for (let hol of self.holidays) {
          if (hol.holDate == monthDate) {
            console.log('hol = {} ', hol);
            return [true, 'holiday', hol.holName];
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
    inlineDatepicker()
    // End Call DatePicker
  }

  ngAfterViewChecked() {
    inlineDatepicker()
  }

  fetchSpecialDate(year, month) {
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

  }

}
