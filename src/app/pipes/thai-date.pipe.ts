import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../providers/utils/utils.service';

@Pipe({
  name: 'thaiDate'
})
export class ThaiDatePipe implements PipeTransform {

  constructor(private utilsService: UtilsService) { }

  transform(value: any, displayType: any): any {
    if (value) {
      if (displayType) {
        switch (displayType) {
          case 'stamptable': {
            return this.utilsService.displayTimestampDate(value)
          }
          case 'calendar': {
            return this.utilsService.displayCalendarDate(value);
          }
          case 'short': {
            return this.utilsService.displayShortDate(value);
          }
          case 'full': {
            return this.utilsService.displayFullDate(value);
          }
        }
      }
      return '';
    }
  }
}