import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Holiday } from '../../../../models/holiday';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { HolidayService } from '../../../../providers/holiday.service';

@Component({
  selector: 'app-holiday-info',
  templateUrl: './holiday-info.component.html',
  styleUrls: ['./holiday-info.component.scss']
})
export class HolidayInfoComponent implements OnInit {

  public holiday: Holiday;

  constructor(private holidayService: HolidayService) {

  }

  ngOnInit() {
    this.holiday = new Holiday();
  }

  editHoliday(event) {
    this.holidayService.emitHoliday(this.holiday.holId);
    this.holidayService.onOpenModal();
  }


}
