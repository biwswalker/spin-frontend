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
    this.spinTimestamp();
  }

  ngAfterViewInit(): void {
    $(".working1").wrapAll("<div class='ggwp1' style='position:relative'></div>");
    $(".working2").wrapAll("<div class='ggwp2' style='position:relative'></div>");
    $(".ggwp1").append("<div style='position: absolute;background: rgba(232, 0, 11, 0.4);top: 0;bottom: 0;left: 0;right: 0;'><div>Loader...</div><div>Detail1</div><div>Detail2</div><div>Detail3</div><div>Detail4</div></div>");
    $(".ggwp2").append("<div style='position: absolute;background: rgba(232, 0, 11, 0.4);top: 0;bottom: 0;left: 0;right: 0;'>Loading...</div>");

  }

  selectedTimetable() {
    let timeList = [];
    let indexList = [];
    const selected = $('.ui-selected')
    for (let element of selected) {
      timeList.push(element.dataset.value)
      indexList.push(element.dataset.index)
    }
  }

  spinTimestamp() {
    $(".timestamp").selectable({
      stop: this.selectedTimetable,
      filter: '.stamp:not(".unavailable")'
    });
  }

}
