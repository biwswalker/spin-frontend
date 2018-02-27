import { Injectable } from '@angular/core';
import { Format } from '../../config/properties';
import { Observable } from 'rxjs/Observable';
declare var moment: any;

@Injectable()
export class UtilsService {

  constructor() {
    moment.locale('th');
  }

  getCurrentThDate(): string {
    let crr = moment().format(Format.DATE_DB);
    let monthDate = crr.substring(4);
    return `${this.convertToThYearStrByEnDate(crr)}${monthDate}`
  }

  getCurrentEnDate(): string {
    return `${moment().format(Format.DATE_DB)}`;
  }

  getCurrentThMonth(): string {
    return `${moment().format(Format.MM)}`
  }

  getCuurentThYear(): string {
    return `${this.convertToThYearStr(moment().format(Format.YYYY))}`
  }

  getThDayWord(enDate): string {
    var day = moment(enDate, Format.DATE_DB);
    var thday = day.format(Format.DDDD);
    return `${thday}`
  }

  getThGetDate(enDate): string {
    var date = moment(enDate, Format.DATE_DB);
    var thdate = date.format(Format.DD);
    return `${thdate}`
  }

  getThMonthWord(enDate): string {
    var month = moment(enDate, Format.DATE_DB);
    var thmonth = month.format(Format.MMM);
    return `${thmonth}`
  }

  getThMonth(enDate): string {
    var month = moment(enDate, Format.DATE_DB);
    var thmonth = month.format(Format.MM);
    return `${thmonth}`
  }

  getThYear(enDate): string {
    var year = moment(enDate, Format.DATE_DB);
    var thyear = year.format(Format.YYYY);
    return `${this.convertToThYearStr(thyear)}`
  }

  getPreviousDay(enDate): string {
    var previousDay = moment(enDate, Format.DATE_DB).subtract(1, 'days').format(Format.DATE_DB);
    return previousDay
  }

  getNextDay(enDate): string {
    var nextDay = moment(enDate, Format.DATE_DB).add(1, 'days').format(Format.DATE_DB);
    return nextDay;
  }

  convertToThYear(year: number): number {
    return year + 543;
  }

  convertToThYearStr(year: string): string {
    let numYear = Number(year)
    let result = numYear + 543;
    return `${result}`;
  }

  convertToThYearStrByEnDate(enDate: string): string {
    let yearStr = enDate.substring(0, 4);
    let thYear = Number(yearStr) + 543;
    return `${thYear}`;
  }

  convertThDateToEn(thDate: string): string {
    let yearStr = thDate.substring(0, 4);
    let monthDate = thDate.substring(4);
    let yearEn = Number(yearStr) - 543;
    return `${yearEn}${monthDate}`;
  }

  convertEnDateToTh(enDate: string): string {
    let yearStr = enDate.substring(0, 4);
    let monthDate = enDate.substring(4);
    let yearTh = Number(yearStr) + 543;
    return `${yearTh}${monthDate}`;
  }

  convertNumberTo2Deci(numMonth: number): string {
    return numMonth > 9 ? `${numMonth}` : `0${numMonth}`;
  }

  convertEnDDMYYYYToThDate(day, month, year){
    let newDay = this.convertNumberTo2Deci(day);
    let newMonth = this.convertNumberTo2Deci(month);
    let newYear = this.convertToThYear(year);
    return `${newYear}${newMonth}${newDay}`;
  }    

  convertThCalendarToThDate(thDate){
    let split = thDate.split(' ', 3)
    let datemonth =  `${split[0]} ${split[1]}`;
    let year = split[2];
    var date = moment(datemonth, Format.DATE_PIKC).format(Format.DATE_PIKR)
    return `${year}${date}`
  }

  convertDisplayTime(time) {
    if (time) {
      let hour = time.substring(0, 2);
      let minute = time.substring(2, 4);
      return hour + ':' + minute;
    }
  }
  
  displayTimestampDate(enDate: string): string {
    return `${this.getThDayWord(enDate)} ${this.getThGetDate(enDate)}  ${this.getThMonthWord(enDate)} ${this.convertToThYearStrByEnDate(enDate)}`
  }

  displayCalendarDate(thDate: string): string {
    let enDate = this.convertThDateToEn(thDate)
    return `${this.getThGetDate(enDate)}/${this.getThMonth(enDate)}/${this.getThYear(enDate)}`
  }

}
