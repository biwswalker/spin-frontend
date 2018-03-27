import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-person',
  templateUrl: './person-report.component.html',
  styleUrls: ['./person-report.component.scss']
})
export class PersonReportComponent implements OnInit {

  public startDate: string = "";
  public endDate: string = "";

  constructor() { }

  ngOnInit() {
  }

  initialData() {

  }

}
