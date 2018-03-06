import { Component, OnInit } from '@angular/core';
import { Holiday } from '../../../../models/holiday';

@Component({
  selector: 'app-holiday-process',
  templateUrl: './holiday-process.component.html',
  styleUrls: ['./holiday-process.component.scss']
})
export class HolidayProcessComponent implements OnInit {

  protected holiday: Holiday = new Holiday();

  constructor() { }

  ngOnInit() {
  }

}
