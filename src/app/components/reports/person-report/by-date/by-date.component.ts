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
      rpt.sumWorkTime = 0;
      for (let worktime of rpt.tasks) {
        worktime.workTime = 0;
        let total = (worktime.sumAsHour * 60) + worktime.sumAsMin;
        worktime.workTime = total;
        rpt.sumWorkTime += total;
        worktime.startEndTime = (this.utilsService.convertDisplayTime(worktime.startTime) + '-' + this.utilsService
        .convertDisplayTime(worktime.endTime));
      }
    }
  }
}
