import { Component, AfterViewInit } from '@angular/core';
import { TaskService } from '../../../../providers/task.service';
import { WorkingTime } from '../../../../config/properties';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { HolidayService } from '../../../../providers/holiday.service';
import { Holiday } from '../../../../models/holiday';
declare var SpinModal: any;
declare var convertTimeString: any;
declare var $: any;

@Component({
  selector: 'timetable-day',
  templateUrl: './timetable-day.component.html',
  styleUrls: ['./timetable-day.component.scss']
})
export class TimetableDayComponent implements AfterViewInit {

  // Get time list
  public worktable = WorkingTime
  public enDateStr = '';
  public holidayName = '';

  constructor(private taskService: TaskService, private utilsService: UtilsService, private holidayService: HolidayService) {
    let checkDubplicated: string[] = [];
    // Async
    this.taskService.currentTimetableDate.subscribe(async enDate => {
      let isDup = checkDubplicated.find(date => date === enDate);
      if (!isDup) {
        this.enDateStr = enDate;
        this.fecthWorkingTaskByDate(enDate);

        // If have find holiday by date method ==> can replace this method
        // Get Holiday
        let holidaysFetch = await this.holidayService.findHolidayByMonth(this.utilsService.getThYear(enDate), this.utilsService.getThMonth(enDate)).toPromise();
        let holiday = holidaysFetch.filter(item => item.holDate === this.utilsService.convertEnDateToTh(enDate) && item.activeFlag === 'A');
        this.holidayName = '';
        for (let hol of holiday) {
          this.holidayName = hol.holName;
        }
      }
    })
    // End Async
  }

  ngAfterViewInit(): void {
    this.spinTimestamp();
    $(".scrolling").scrollTop(242);
  }

  fecthWorkingTaskByDate(enDate: string) {
    this.taskService.findWorkingTaskByDate(this.utilsService.convertEnDateToTh(enDate)).subscribe((tasks: any[]) => {
      let index = 0;
      let isRepeat: number[] = [];
      this.refreshTimeTable();
      for (let task of tasks) {
        // Check Report loop Subject
        let repeated = isRepeat.find(id => id === task.taskId);
        if (!repeated) {
          if (task.activeFlag === 'A') {
            let start = Number(task.workStartTime);
            let end = Number(task.workEndTime) - 30;

            // Find index of timetable
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

            // set css class and append tag and class to timetable
            let groupClass = `stamped${index}`
            let overlapClass = `overlap${index}`
            let overlayClass = `overlay${index}`
            let totalInd = endIndex - startIndex;
            for (let i = startIndex; i <= endIndex; i++) {
              $($($(`.timestamp`).find('.stamp'))[i]).addClass(`unavailable ${groupClass}`);
            }
            // Step
            $(`.${groupClass}`).wrapAll(`<div class='${overlapClass} timegroup position-relative' style='cursor: pointer;z-index:101;'></div>`);
            $(`.${overlapClass}`).append(`<div class='${overlayClass} ${task.color} position-absolute' style='top: 0;bottom: 0;left: 0;right: 0; overflow: hidden;word-wrap: break-word;'>
              <div class="m-0 stamp-topic text-truncate"><div class="d-inline" style="color:white;">${this.utilsService.convertDisplayTime(task.workStartTime)} - ${this.utilsService.convertDisplayTime(task.workEndTime)}  </div>
              ${task.projectAbbr ? `<div class="d-inline topic-task" style="color:white;"> #${task.projectAbbr}</div>` : ''}</div>
              ${totalInd > 0 ? `<div class="stamp-topic m-0"><div class="topic-task" style="color:white;">${task.topic}</div></div>` : ''}
              ${totalInd > 1 ? `<div class="stamp-activity m-0" style="color:white;">${task.activity}</div>` : ''}
              <p class="text-truncate colla-display m-0" style="color:white;">${task.taskPartnerList ? '<i class="fas fa-users"></i>' : ''}</p>        
            </div>`);

            // Step
            $(`.${overlayClass}`).addClass('stamp-box')
            $(`.${overlapClass}`).click(() => this.onViewTask(task));
            isRepeat.push(task.taskId)
            index++;
          }
        }
      }
    }, err => {
      console.log(err)
    })
  }

  refreshTimeTable() {
    // Move to top overlap
    let timegroup = $('.timestamp').find('.timegroup');
    for (let time of timegroup) {
      let overlap = time.className.split(" ", 1)[0];
      $(`.${overlap}`).before($(`.${overlap}`).find('.stamp'));
      $(`.${overlap}`).remove();
    }
    // Delete unavailable
    let stamped = $('.timestamp').find('.unavailable');
    for (let stamp of stamped) {
      let unavailable = stamp.className.split(" ", 4)[3];
      $('.stamp').removeClass(unavailable);
    }
    $('.stamp').removeClass('unavailable');
  }

  spinTimestamp() {
    // this of .ts file
    let self = this;

    // Start jquery func
    $(".timestamp").selectable({
      filter: '.stamp:not(".unavailable")',
      stop: () => {
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
          let modal = new SpinModal();
          modal.initial('#task-modal', { show: true, backdrop: 'static', keyboard: true })
          $('#task-modal').on("hidden.bs.modal", function () {
            $('.timestamp .ui-selected').removeClass('ui-selected')
          })
          // Call TS fucntion
          self.taskService.updateCurrentTimeTask(this.utilsService.convertEnDateToTh(this.enDateStr), startWorkingTime, endWorkingTime)
        }
      },
    });
  }

  onViewTask(task) {
    let modal = new SpinModal();
    modal.initial('#task-modal', { show: true, backdrop: 'static', keyboard: true })
    $('#task-modal').on("hidden.bs.modal", function () {
    })
    this.taskService.onViewTask(task);
  }

}
