import { UtilsService } from './../../../../providers/utils/utils.service';
import { PersonReport } from './../../../../models/person-report';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-date',
  templateUrl: './by-date.component.html',
  styleUrls: ['./by-date.component.scss', '../person-report.component.scss']
})
export class ByDateComponent implements OnInit {

  public reportPersonList: PersonReport[] = [];

  constructor(
    public utilsService: UtilsService
  ) { }

  ngOnInit() {
  }

  initialData(data) {
    this.reportPersonList = data;
    for (let rpt of this.reportPersonList) {
      rpt.sumWorkH = 0;
      rpt.sumWorkM = 0;
      for (let worktime of rpt.tasks) {
        rpt.sumWorkH += worktime.sumAsHour;
        rpt.sumWorkM += worktime.sumAsMin;
        if(rpt.sumWorkM == 60){
          rpt.sumWorkH += 1;
          rpt.sumWorkM = 0;
        }
        worktime.startEndTime = (this.utilsService.convertDisplayTime(worktime.startTime) + '-' + this.utilsService.convertDisplayTime(worktime.endTime));
      }
    }
  }
}
