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
  public size = 13;

  public throttle = 1000;
  public scrollDistance = 1;
  protected criteriaValue: string;


  constructor(protected holidayService: HolidayService) { }

  ngOnInit() {
    this.holidays = [];
    this.getAllHoliday();
  }

  getAllHoliday() {
    console.log('getAllHoliday');
    this.page = 1;
    this.holidayService.findAllPageable(this.page, this.size).subscribe(
      collection => {
        this.holidays = collection;
        this.messageEvent.emit(collection[0].holId);
        this.page += 1;
      }
    );
  }

  onChangeHoliday(holiday) {
    console.log(holiday);
    this.messageEvent.emit(holiday.holId);
  }

  onSearchByCriteria(criteria) {
    console.log(criteria);
    this.page = 1;
    if (criteria) {
      this.criteriaValue = criteria;
      this.holidayService.findByCriteria(criteria, this.page, this.size).subscribe(
        collection => {
          this.holidays = collection;
          if (collection.length > 0) {
            this.messageEvent.emit(collection[0].holId);
          }
          this.page += 1;
        }
      );
    } else {
      this.criteriaValue = '';
      this.getAllHoliday();
    }
  }


  onScrollDown() {
    console.log('onScrollDown' + this.criteriaValue);
    if (this.criteriaValue) {
      this.holidayService.findByCriteria(this.criteriaValue, this.page, this.size).subscribe(
        collection => {
          this.holidays = this.holidays.concat(collection);
          this.page += 1;
        }
      );
    } else {
      this.holidayService.findAllPageable(this.page, this.size).subscribe(
        collection => {
          if (collection) {
            this.page += 1;
            this.holidays = this.holidays.concat(collection);
          }
        }
      );
    }

  }

}
