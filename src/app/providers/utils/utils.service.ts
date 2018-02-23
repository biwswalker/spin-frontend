import { Injectable } from '@angular/core';
declare var moment: any;

@Injectable()
export class UtilsService {

  constructor() {
    moment.locale('th');
   }

  getCurrentThDate(): string {
    const date = `${ moment().format('YYYYMMDD')}`
    return `${this.convertToThYearStrByEnDate(date)}`
  }

  getCurrentEnDate(): string {
    return `${ moment().format('YYYYMMDD')}`;
  }

  getThDayWord(enDate): string {
    var day = moment(enDate, 'YYYYMMDD');
    var thday = day.format('dddd');
    return `${thday}`
  }

  getThMonthWord(enDate): string {
    var month = moment(enDate, 'YYYYMMDD');
    var thmonth = month.format('MMM');
    return `${thmonth}`
  }

  getGetDate(enDate): string {
    var date = moment(enDate, 'YYYYMMDD');
    var thdate = date.format('Do');
    return `${thdate}`
  }

  getPreviousDay(enDate): string {
    var previousDay = moment(enDate, 'YYYYMMDD').subtract(1, 'days')
    return ``
  }

  getNextDay(enDate): string {
    var previousDay = moment(enDate, 'YYYYMMDD').add(1, 'days')
    return ``
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
    let yearStr = enDate.substring(1, 5);
    let thYear = Number(yearStr) + 543;
    return `${thYear}`;
  }

  convertTHDateToEn(thDate: string): string {
    let yearStr = thDate.substring(1, 5);
    let monthDate = thDate.substring(5);
    let yearEn = Number(yearStr) - 543;
    return `${yearEn}${monthDate}`;
  }

  displayTimestampDate(enDate: string): string {
    return `${this.getThDayWord(enDate)} ${this.getGetDate(enDate)}  ${this.getThMonthWord(enDate)} ${this.convertToThYearStrByEnDate(enDate)}`
  }

}
