import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-person',
  templateUrl: './report-person.component.html',
  styleUrls: ['./report-person.component.scss']
})
export class ReportPersonComponent implements OnInit {

  public startDate: string = "";
  public endDate: string = "";

  constructor() { }

  ngOnInit() {
  }

  initialData() {

  }

}
