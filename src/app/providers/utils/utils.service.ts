import { Injectable } from '@angular/core';
declare var moment: any;

@Injectable()
export class UtilsService {

  constructor() {
    moment.locale('th');
  }

  getCurrentThDate(): string {
    let crr = moment().format('YYYYMMDD');
    let monthDate = crr.substring(4);
    return `${this.convertToThYearStrByEnDate(crr)}${monthDate}`
  }

  getCurrentEnDate(): string {
    return `${moment().format('YYYYMMDD')}`;
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

  getThGetDate(enDate): string {
    var date = moment(enDate, 'YYYYMMDD');
    var thdate = date.format('DD');
    return `${thdate}`
  }

  getPreviousDay(enDate): string {
    var previousDay =  moment(enDate, 'YYYYMMDD').subtract(1, 'days').format("YYYYMMDD");
    return previousDay
  }

  getNextDay(enDate): string {
    var nextDay =  moment(enDate, 'YYYYMMDD').add(1, 'days').format("YYYYMMDD");
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

  displayTimestampDate(enDate: string): string {
    return `${this.getThDayWord(enDate)} ${this.getThGetDate(enDate)}  ${this.getThMonthWord(enDate)} ${this.convertToThYearStrByEnDate(enDate)}`
  }

}
