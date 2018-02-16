import { Component, OnInit } from '@angular/core';
declare var Selectable: any;

@Component({
  selector: 'timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let timetable = new Selectable();
    timetable.initial('.timestamp');
  }

}
