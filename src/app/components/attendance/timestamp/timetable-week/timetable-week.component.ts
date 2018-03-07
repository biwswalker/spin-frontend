import { Component, OnInit } from '@angular/core';
import { WorkingTime } from '../../../../config/properties';

@Component({
  selector: 'timetable-week',
  templateUrl: './timetable-week.component.html',
  styleUrls: ['./timetable-week.component.scss']
})
export class TimetableWeekComponent implements OnInit {

  // Get time list
  public worktable = WorkingTime
  public enDateStr = '';
  
  constructor() { }

  ngOnInit() {
    console.log('GGWP')
  }

}
