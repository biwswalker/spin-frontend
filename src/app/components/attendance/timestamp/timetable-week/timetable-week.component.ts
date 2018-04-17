import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WorkingTime } from '../../../../config/properties';
import { TaskService } from '../../../../providers/task.service';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { Task } from '../../../../models/task';
import { Observable } from 'rxjs/Observable';
import { HolidayService } from '../../../../providers/holiday.service';

declare var $: any;
declare var SpinModal: any;
declare var convertTimeString: any;
@Component({
  selector: 'timetable-week',
  templateUrl: './timetable-week.component.html',
  styleUrls: ['./timetable-week.component.scss']
})
export class TimetableWeekComponent implements AfterViewInit {


  // Get time list
  public worktable = WorkingTime
  public firstDOW = '';
  public endDOW = '';
  public dates: Observable<string>[] = [];
  public holidays: Observable<string>[] = [];

  constructor(private taskService: TaskService, private utilsService: UtilsService, private holidayService: HolidayService) {
    let checkDubplicated: string[] = [];
    // Async
    this.taskService.currentTimetableDOW.subscribe((dow: any) => {
      let isDup = checkDubplicated.find(date => date === dow);
      if (!isDup) {
        if (dow.start && dow.end) {
          this.firstDOW = dow.start;
          this.endDOW = dow.end;
          this.fecthWorkingTaskByWeek()
        }
      }
    })
    // End Async
  }

  ngAfterViewInit(): void {
    this.spinTimestamp();
    $(".scrolling").scrollTop(242);
  }

  async fecthWorkingTaskByWeek() {
    let dataDate = this.firstDOW
    let holidaysFetch = await this.holidayService.findHolidayByMonth(this.utilsService.getThYear(this.utilsService.convertThDateToEn(dataDate)), this.utilsService.getThMonth(this.utilsService.convertThDateToEn(dataDate))).toPromise();
    for (let i = 1; i <= 7; i++) {
      this.fecthWorkingTaskByDate(dataDate, i);
      this.dates[i - 1] = Observable.of(dataDate);

      // If have find holiday by date method ==> can replace this method
      // Get Holiday
      let holiday = holidaysFetch.filter(item => item.holDate === this.utilsService.convertEnDateToTh(this.utilsService.convertThDateToEn(dataDate)) && item.activeFlag === 'A');
      this.holidays[i - 1] = Observable.of('');
      for (let hol of holiday) {
        if (hol.holName) {
          this.holidays[i - 1] = Observable.of(hol.holName);
        }
      }
      dataDate = this.utilsService.getNextDay(dataDate);
    }
  }

  fecthWorkingTaskByDate(thDate: string, dateIndex: number) {
    this.refreshTimeTable();
    this.taskService.findWorkingTaskByDate(thDate).subscribe((tasks: any[]) => {
      let index = 0;
      for (let task of tasks) {
        if (task.activeFlag === 'A') {
          let start = Number(task.workStartTime);
          let end = Number(task.workEndTime) - 30;
          let startIndex = -1;
          let endIndex = -1;
          if (start === end) {
            startIndex = this.worktable.findIndex(time => time === start)
            endIndex = startIndex;
          } else {
            startIndex = this.worktable.findIndex(time => time === start)
            let min = convertTimeString(end).substr(2, 1);
            if (min === '7') {
              endIndex = this.worktable.findIndex(time => time === end - 40)
            } else {
              endIndex = this.worktable.findIndex(time => time === end)
            }
          }

          let groupClass = `stamped${dateIndex}${index}`
          let overlapClass = `overlap${dateIndex}${index}`
          let overlayClass = `overlay${dateIndex}${index}`
          let totalInd = endIndex - startIndex;
          // Step 1
          for (let i = startIndex; i <= endIndex; i++) {
            $($($(`.timestamp-week${dateIndex}`).find('.stamp'))[i]).addClass(`unavailable ${groupClass}`);
          }
          // Step 2
          $(`.unavailable.${groupClass}`).wrapAll(`<div class='${overlapClass} timegroup position-relative' style='cursor: pointer;z-index:101;'></div>`);
          $(`.${overlapClass}`).append(`<div class='${overlayClass} ${task.color} position-absolute' style='top: 0;bottom: 0;left: 0;right: 0; overflow: hidden;word-wrap: break-word;font-size: 14px;'>
              <div class="m-0 stamp-topic"><div class="d-inline" style="color:white;">${this.utilsService.convertDisplayTime(task.workStartTime)} - ${this.utilsService.convertDisplayTime(task.workEndTime)}  </div>
              ${task.projectAbbr ? `<div class="d-inline topic-task" style="color:white;"> #${task.projectAbbr}</div>` : ''}</div>
              ${totalInd > 0 ? `<div class="stamp-topic m-0"><div class="topic-task" style="color:white;">${task.topic}</div></div>` : ''}
              ${totalInd > 1 ? `<div class="stamp-activity m-0" style="color:white;">${task.activity}</div>` : ''}
              <p class="text-truncate colla-display m-0" style="color:white;">${task.taskPartnerList ? '<i class="fas fa-users"></i>' : ''}</p>        
            </div>`);
          // Step 3
          $(`.${overlayClass}`).addClass('stamp-box')
          $(`.${overlapClass}`).click(() => this.onViewTask(task));
          index++;
        }
      }
    }, err => {
      console.log(err)
    })
  }
  // <p class="text-truncate m-0 stamp-activity">${task.activity}</p>        

  refreshTimeTable() {
    // Move to top overlap
    for (let i = 1; i <= 7; i++) {
      let timegroup = $(`.timestamp-week${i}`).find('.timegroup');
      for (let time of timegroup) {
        let overlap = time.className.split(" ", 1)[0];
        $(`.${overlap}`).before($(`.${overlap}`).find('.stamp'));
        $(`.${overlap}`).remove();
      }
      // Delete unavailable
      let stamped = $(`.timestamp-week${i}`).find('.unavailable');
      for (let stamp of stamped) {
        let unavailable = stamp.className.split(" ", 4)[3];
        $('.stamp').removeClass(unavailable);
      }
      $('.stamp').removeClass('unavailable');
    }
  }

  onViewTask(task) {
    let modal = new SpinModal();
    modal.initial('#task-modal', { show: true, backdrop: 'static', keyboard: true })
    $('#task-modal').on("hidden.bs.modal", function () {
    })
    this.taskService.onViewTask(task);
  }


  spinTimestamp() {
    // this of .ts file
    let self = this;
    // Start jquery func
    for (let i = 1; i < 8; i++) {
      let selectorName = `.timestamp-week${i}`
      $(selectorName).selectable({
        filter: '.stamp:not(".unavailable")',
        stop: () => self.onStopFucn(selectorName),
      });
    }

  }

  onStopFucn(selector: string) {
    let timeList = [];
    let indexList = [];
    const selected = $(`${selector} .ui-selected`)
    let preIndex: number = null;
    let dateIndex: number = null;
    // fecth value form table
    for (let element of selected) {
      let index = element.dataset.index;
      let value = element.dataset.value;
      let col = element.dataset.col;
      if (preIndex == null) {
        timeList.push(value);
        indexList.push(index);
        preIndex = index;
        dateIndex = col;
      } else {
        let prevInd: number = index - 1;
        if (prevInd == preIndex) {
          timeList.push(value);
          indexList.push(index);
          preIndex = index;
          dateIndex = col;
        }
      }
    }
    // Get time from slide
    if (timeList.length > 0) {
      let startWorkingTime = '';
      let endWorkingTime = '';

      if (timeList.length == 1) {
        let starttime = Number(timeList[0])
        let endtime = Number(timeList[0]) + 30
        let min = convertTimeString(endtime).substr(2, 1);
        if (min === '6') {
          endtime = endtime + 40;
        }
        startWorkingTime = convertTimeString(starttime);
        endWorkingTime = convertTimeString(endtime);
      } else {
        let starttime = Number(timeList[0])
        // +70 is => 0630+70=0700
        let endtime = Number(timeList[timeList.length - 1]) + 30
        let min = convertTimeString(endtime).substr(2, 1);
        if (min === '6') {
          endtime = endtime + 40;
        }
        startWorkingTime = convertTimeString(starttime);
        endWorkingTime = convertTimeString(endtime);
      }
      let selectDate = '';
      const dateObj = this.dates[dateIndex];
      dateObj.subscribe(date => selectDate = date);
      let modal = new SpinModal();
      modal.initial('#task-modal', { show: true, backdrop: 'static', keyboard: true })
      $('#task-modal').on("hidden.bs.modal", function () {
        $(`${selector} .ui-selected`).removeClass('ui-selected');
      })
      // Call TS fucntion
      this.taskService.updateCurrentTimeTask(selectDate, startWorkingTime, endWorkingTime)
    }
  }
}
