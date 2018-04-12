import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../providers/utils/utils.service';

@Component({
  selector: 'app-by-tag',
  templateUrl: './by-tag.component.html',
  styleUrls: ['./by-tag.component.scss']
})
export class ByTagComponent implements OnInit {

  public tagReport: TagReport;

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.tagReport = new TagReport();
  }

  initialData(data) {
    if (data) {
      this.tagReport = data;
      this.utilsService.loader(false);
    }
  }
}

class TagReport {
  public maxSpentTime: Time;
  public summary: Summary[];
  public maxSpentSummaryTime: number;

  constructor() {
    this.maxSpentTime = new Time();
    this.summary = [];
    this.maxSpentSummaryTime = null;
  }
}

class Time {
  public hour: number;
  public minute: number;

  constructor() {
    this.hour = null;
    this.minute = null;
  }
}

class Summary {
  public name: string;
  public summaryTime: number;
  public hour: number;
  public minute: number;

  constructor() {
    this.name = "";
    this.summaryTime = null;
    this.hour = null;
    this.minute = null;
  }
}
