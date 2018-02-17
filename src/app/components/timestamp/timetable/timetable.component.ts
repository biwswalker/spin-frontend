import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var SpinModal: any;
declare var $: any;

@Component({
  selector: 'timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit, AfterViewInit {

  
  constructor() { }

  ngOnInit() {
    this.spinTimestamp('.timestamp');
  }

  ngAfterViewInit(): void {
    $($('.stamp')[2]).css("background", "red")
    $($('.stamp')[3]).css("background", "red")

    $( ".woking" ).wrapAll($(".overlap"));
    $( ".overlay" ).appendTo($(".overlap"));
  }

  selectedTimetable() {
    let timeList = [];
    const selected = $('.ui-selected')
    for (let element of selected) {
      timeList.push(element.dataset.value) 
    }
    console.log(timeList)
  }

  spinTimestamp(name) {
    $(name).selectable({
      stop: this.selectedTimetable
    });
  }

}
