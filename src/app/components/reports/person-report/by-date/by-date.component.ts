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
        worktime.startEndTime = (this.utilsService.convertDisplayTime(worktime.startTime) + ' - ' + this.utilsService.convertDisplayTime(worktime.endTime));
        rpt.sumWorkH += worktime.sumAsHour;
        rpt.sumWorkM += worktime.sumAsMin;
      }
        // rpt.sumWorkH += rpt.sumWorkM/60;
        rpt.sumWorkH += Math.floor(rpt.sumWorkM/60);
        rpt.sumWorkM = rpt.sumWorkM%60;
    }
  }
}
