import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-tag',
  templateUrl: './by-tag.component.html',
  styleUrls: ['./by-tag.component.scss']
})
export class ByTagComponent implements OnInit {

  public tagReport: TagReport;

  constructor() { }

  ngOnInit() {
    this.tagReport = new TagReport();
  }

  initialData(data) {
    console.log(data);
    if (data) {
      this.tagReport = data;
      this.tagReport.maxSpentSummaryTime = 0;
      this.tagReport.maxSpentSummaryTime = (this.tagReport.maxSpentTime.hour * 60) + this.tagReport.maxSpentTime.minute;
      for (let time of this.tagReport.summary) {
        time.summaryTime = (time.hour * 60) + time.minute;
      }
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
