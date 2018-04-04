import { Component, OnInit } from '@angular/core';
import { WorkingTime } from '../../../../config/properties';
import { TaskService } from '../../../../providers/task.service';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { Task } from '../../../../models/task';
import { Observable } from 'rxjs/Observable';

declare var $: any;
declare var SpinModal: any;
declare var convertTimeString: any;
@Component({
  selector: 'timetable-week',
  templateUrl: './timetable-week.component.html',
  styleUrls: ['./timetable-week.component.scss']
})
export class TimetableWeekComponent {

  // Get time list
  public worktable = WorkingTime
  public firstDOW = '';
  public endDOW = '';
  public dates: Observable<string>[] = [];

  constructor(private taskService: TaskService, private utilsService: UtilsService) {
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

  fecthWorkingTaskByWeek() {
    let dataDate = this.firstDOW
    for (let i = 1; i <= 7; i++) {
      this.fecthWorkingTaskByDate(dataDate, i);
      this.dates[i - 1] = Observable.of(dataDate);
      dataDate = this.utilsService.getNextDay(dataDate)
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

           // If time is over 1900 and less than 600
          //  if(start < 600){
          //   start = 600
          // }
          // if(end >= 1900){
          //   end = 1830
          // }
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
          $(`.${groupClass}`).wrapAll(`<div class='${overlapClass} timegroup position-relative' style='cursor: pointer;z-index:101;'></div>`);
          $(`.${overlapClass}`).append(`<div class='${overlayClass} ${task.color} position-absolute' style='top: 0;bottom: 0;left: 0;right: 0; overflow: hidden;'>
              <div class="m-0 stamp-topic text-truncate"><div class="d-inline">${this.utilsService.convertDisplayTime(task.workStartTime)} - ${this.utilsService.convertDisplayTime(task.workEndTime)}  </div>
              ${task.projectAbbr ? `<div class="d-inline topic-task"> #${task.projectAbbr}</div>` : ''}</div>
              ${totalInd > 0 ? `<div class="stamp-topic m-0"><div class="topic-task">${task.topic}</div></div>` : ''}
              ${totalInd > 1 ? `<div class="stamp-activity m-0">${task.activity}</div>` : ''}
              <p class="text-truncate colla-display m-0">${task.taskPartnerList ? '<i class="fas fa-users"></i>' : ''}</p>        
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

}
