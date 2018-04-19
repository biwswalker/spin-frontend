import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Holiday } from '../../../../models/holiday';
import { HolidayService } from '../../../../providers/holiday.service';

@Component({
  selector: 'app-holiday-search',
  templateUrl: './holiday-search.component.html',
  styleUrls: ['./holiday-search.component.scss']
})
export class HolidaySearchComponent implements OnInit {

  public holidays: Holiday[];

  @Output() messageEvent = new EventEmitter<number>();

  public page = 1;
  public size = 20;

  public throttle = 1000;
  public scrollDistance = 1;
  protected criteriaValue: string;

  public totalElements = 0;

  constructor(protected holidayService: HolidayService) { }

  ngOnInit() {
    this.holidays = [];
    this.onSearchByCriteria('');
  }

  onChangeHoliday(holiday) {
    this.messageEvent.emit(holiday.holId);
  }

  onSearchByCriteria(criteria) {
    this.page = 1;
    this.criteriaValue = criteria;
    this.holidayService.findByCriteria(criteria, this.page, this.size).subscribe(
      collection => {
        this.holidays = collection.content;
        this.totalElements = collection.totalElements;
        if (this.holidays.length > 0) {
          this.messageEvent.emit(this.holidays[0].holId);
        }
        this.page += 1;
      }
    );

  }

  onScrollDown() {
    this.holidayService.findByCriteria(this.criteriaValue, this.page, this.size).subscribe(
      collection => {
        this.holidays = this.holidays.concat(collection.content);
        this.page += 1;
      }
    );

  }

}
