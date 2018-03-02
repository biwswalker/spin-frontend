import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../providers/utils/utils.service';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  constructor(private utilsService: UtilsService) { }

  transform(value: any): any {
    if (value) {
      return this.utilsService.convertDisplayTime(value)
    }
    return '';
  }

}
