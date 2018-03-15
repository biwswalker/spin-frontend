import { Component, AfterViewInit } from '@angular/core';
import { TaskService } from '../../../../providers/task.service';
import { WorkingTime } from '../../../../config/properties';
import { UtilsService } from '../../../../providers/utils/utils.service';
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

  constructor(private taskService: TaskService, private utilsService: UtilsService) {
    // Async
    this.taskService.currentTimetableDate.subscribe(enDate => {
      this.enDateStr = enDate;
      this.fecthWorkingTaskByDate(enDate)
    })
    // End Async
  }

  ngAfterViewInit(): void {
    this.spinTimestamp();

    $('#timetable-task').on('click', '.child', function () {
      console.log("click");
    });
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
            const start = Number(task.workStartTime);
            const end = Number(task.workEndTime) - 30;
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
            let groupClass = `stamped${index}`
            let overlapClass = `overlap${index}`
            let overlayClass = `overlay${index}`
            let totalInd = endIndex - startIndex;
            for (let i = startIndex; i <= endIndex; i++) {
              $($('.stamp')[i]).addClass(`unavailable ${groupClass}`);
            }
            $(`.${groupClass}`).wrapAll(`<div class='${overlapClass} timegroup position-relative' style='cursor: pointer;z-index:999;'></div>`);
            $(`.${overlapClass}`).append(`<div class='${overlayClass} ${task.color} position-absolute' style='top: 0;bottom: 0;left: 0;right: 0;'>
              <div class="m-0 stamp-topic text-truncate"><div class="d-inline">${this.utilsService.convertDisplayTime(task.workStartTime)} - ${this.utilsService.convertDisplayTime(task.workEndTime)}  </div>
              ${task.projectAbbr ? `<div class="d-inline topic-task"> #${task.projectAbbr}</div>` : ''}</div>
              ${totalInd > 0 ? `<div class="stamp-topic text-truncate m-0"><div class="topic-task">${task.topic}</div></div>` : ''}
              ${totalInd > 1 ? `<div class="stamp-activity text-truncate m-0">${task.activity}</div>` : ''}
              <p class="text-truncate colla-display m-0">${task.taskPartnerList ? '<i class="fas fa-users"></i>' : ''}</p>        
            </div>`);
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
  // <p class="text-truncate m-0 stamp-activity">${task.activity}</p>   

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
