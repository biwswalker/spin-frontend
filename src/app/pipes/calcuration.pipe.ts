import { UtilsService } from './../providers/utils/utils.service';
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'calcuration'
})
export class CalcurationPipe implements PipeTransform {

  constructor(private utilsService: UtilsService){

  }

  transform(value: any, displayType: any): any {
    if (value) {
      if (displayType) {
        switch (displayType) {
          case 'minstohours': {
            return this.utilsService.displayTimestampDate(value)
          }
        }
      }
      return '';
    }
  }
}
