import { Component, OnInit } from '@angular/core';
import { WorkingTime } from '../../../../config/properties';
import { TaskService } from '../../../../providers/task.service';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { Task } from '../../../../models/task';

declare var $: any;
declare var SpinModal: any;
@Component({
  selector: 'timetable-week',
  templateUrl: './timetable-week.component.html',
  styleUrls: ['./timetable-week.component.scss']
})
export class TimetableWeekComponent implements OnInit {

  // Get time list
  public worktable = WorkingTime
  public enDateStr = '';

  constructor(private taskService: TaskService, private utilsService: UtilsService) {
    // Async
    this.taskService.currentTimetableDate.subscribe(enDate => {
      this.enDateStr = enDate;
      this.fecthWorkingTaskByWeek(enDate)
    })
    // End Async
  }

  ngOnInit() {
  }

  fecthWorkingTaskByWeek(enDate) {
    let firstDate = this.utilsService.getStartOfWeek(enDate, true);
    let endDate = this.utilsService.getEndOfWeek(enDate, true);
    let dataDate = firstDate
    for (let i = 1; i <= 7; i++) {
      this.fecthWorkingTaskByDate(dataDate, i);
      dataDate = this.utilsService.getNextDay(dataDate)
    }
  }

  fecthWorkingTaskByDate(thDate: string, dateIndex: number) {
    this.refreshTimeTable();
    this.taskService.findWorkingTaskByDate(thDate).subscribe((tasks: Task[]) => {
      let index = 0;
      for (let task of tasks) {
        if (task.activeFlag === 'A') {
          const start = Number(task.workStartTime);
          const end = Number(task.workEndTime) - 29;
          let startIndex = -1;
          let endIndex = -1;
          if (start === end) {
            startIndex = this.worktable.findIndex(time => time === start)
            endIndex = startIndex;
          } else {
            startIndex = this.worktable.findIndex(time => time === start)
            endIndex = this.worktable.findIndex(time => time === end)
          }
          console.log(`Date Index : ${startIndex} - ${endIndex}`)

          let groupClass = `stamped${dateIndex}${index}`
          let overlapClass = `overlap${dateIndex}${index}`
          let overlayClass = `overlay${dateIndex}${index}`
          // Step 1
          for (let i = startIndex; i <= endIndex; i++) {
            $($(`.timestamp-week${dateIndex} > .stamp`)[i]).addClass(`unavailable ${groupClass}`);
          }
          // Step 2
          $(`.${groupClass}`).wrapAll(`<div class='${overlapClass} timegroup position-relative' style='cursor: pointer;z-index:999;'></div>`);
          $(`.${overlapClass}`).append(`<div class='${overlayClass} ${task.color} position-absolute' style='top: 0;bottom: 0;left: 0;right: 0;'>
        <p class="text-truncate m-0 stamp-topic">${task.topic}</p>
        <p class="text-truncate m-0 stamp-activity">${task.activity}</p>        
        <p class="text-truncate colla-display m-0"><i class="fas fa-users"></i></p>        
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
