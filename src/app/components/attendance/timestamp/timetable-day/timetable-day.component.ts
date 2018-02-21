import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var SpinModal: any;
declare var $: any;

@Component({
  selector: 'timetable-day',
  templateUrl: './timetable-day.component.html',
  styleUrls: ['./timetable-day.component.scss']
})
export class TimetableDayComponent implements OnInit {



  constructor() { }

  ngOnInit() {
    this.spinTimestamp();
  }

  ngAfterViewInit(): void {
    // $(".working1").wrapAll("<div class='ggwp1' style='position:relative'></div>");
    // $(".working2").wrapAll("<div class='ggwp2' style='position:relative'></div>");
    // $(".ggwp1").append("<div style='position: absolute;background: rgba(232, 0, 11, 0.4);top: 0;bottom: 0;left: 0;right: 0;'><div>Loader...</div><div>Detail1</div><div>Detail2</div><div>Detail3</div><div>Detail4</div></div>");
    // $(".ggwp2").append("<div style='position: absolute;background: rgba(232, 0, 11, 0.4);top: 0;bottom: 0;left: 0;right: 0;'>Loading...</div>");

  }

  selectedTimetable() {
    let timeList = [];
    let indexList = [];
    const selected = $('.ui-selected')
    let preIndex: number = null;
    for (let element of selected) {
      let index = element.dataset.index;
      let value = element.dataset.value;
      if (preIndex == null) {
        timeList.push(value);
        indexList.push(index);
        preIndex = index;
      } else {
        let prevInd: number = index - 1;
        if (prevInd == preIndex) {
          timeList.push(value);
          indexList.push(index);
          preIndex = index;
        }
      }
    }
    if (timeList.length > 0) {
      let startWorkingTime = '0000';
      let endWorkingTime = '0000';
      if (timeList.length = 1) {
        let starttime = Number(timeList[0])
        let endtime = Number(timeList[0]) + 29
        startWorkingTime = this.convertTimeString(starttime);
        endWorkingTime = this.convertTimeString(endtime);
      }else{
        let starttime = Number(timeList[0])
        let endtime = Number(timeList[timeList.length - 1]) + 29
        startWorkingTime = this.convertTimeString(starttime);
        endWorkingTime = this.convertTimeString(endtime);
      }
      console.log(startWorkingTime)
      console.log(endWorkingTime)
    }
    let modal = new SpinModal();
    modal.initial('#task-modal', { show: true, backdrop: 'static', keyboard: true })
    modal.onClose('#task-modal', function () {
      console.log('Close Modal')
      $('.timestamp .ui-selected').removeClass('ui-selected')
    })
  }

  spinTimestamp() {
    $(".timestamp").selectable({
      stop: this.selectedTimetable,
      filter: '.stamp:not(".unavailable")'
    });
  }

  convertTimeString(num): string {
    var zero = 4 - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
}
