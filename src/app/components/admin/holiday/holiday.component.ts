import { Component, OnInit, ViewChild } from '@angular/core';
import { HolidayInfoComponent } from './holiday-info/holiday-info.component';
import { HolidaySearchComponent } from './holiday-search/holiday-search.component';
import { HolidayModalComponent } from './holiday-modal/holiday-modal.component';
import { HolidayService } from '../../../providers/holiday.service';
import { Mode } from '../../../config/properties';
import { Holiday } from '../../../models/holiday';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {

  @ViewChild(HolidayInfoComponent) holidayInfo;
  @ViewChild(HolidaySearchComponent) holidaySearch;
  @ViewChild(HolidayModalComponent) holidayModal;


  protected holId: number;

  constructor(protected holidayService: HolidayService) {
  }

  ngOnInit() {
  }

  getData(key) {
    console.log('key = ' + key);
    this.holId = key;
    this.getHolidayInfo();
  }

  getHolidayInfo() {
    this.holidayService.findByHolId(this.holId).subscribe(
      res => {
        this.holidayInfo.holiday = res;
      }
    );
  }

  createHoliday() {
    this.holidayModal.mode = Mode.I;
    this.holidayModal.holiday = new Holiday();
    this.holidayModal.ngOnInit();
    this.holidayService.onOpenModal();
  }

  onCheckState(key) {
    console.log('onCheckState = ' + key);
    if (key) {
      this.holidaySearch.ngOnInit();
    }
  }

}
