import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TaskService } from '../../../../providers/task.service';
import { TaskModalComponent } from '../../task/task-modal/task-modal.component';
import { Task } from '../../../../models/task';
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
export class TimetableDayComponent implements OnInit {

  @ViewChild(TaskModalComponent) taskModalChild;

  // Get time list
  public worktable = WorkingTime

  private date = '';

  constructor(private taskService: TaskService, private utilsService: UtilsService) {
  }

  ngOnInit() {
    this.spinTimestamp();
    // console.log('en date : '+this.utilsService.getCurrentEnDate());
    // console.log('th date : '+this.utilsService.getCurrentThDate());
    // console.log('next Date : '+this.utilsService.getNextDay(this.utilsService.getCurrentEnDate()));
    // console.log('prev Date : '+this.utilsService.getPreviousDay(this.utilsService.getCurrentEnDate()));
    // console.log('display : '+this.utilsService.displayTimestampDate(this.utilsService.getCurrentEnDate()));
  }

  ngAfterViewInit() {
    this.taskService.findWorkingTaskByDate('25610222').subscribe((tasks: Task[]) => {
      let index = 0;
      for (let task of tasks) {
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

        let groupClass = `stamped${index}`
        let overlapClass = `overlap${index}`
        let overlayClass = `overlay${index}`
        for (let i = startIndex; i <= endIndex; i++) {
          $($('.stamp')[i]).addClass(`unavailable ${groupClass}`);
        }
        $(`.${groupClass}`).wrapAll(`<div class='${overlapClass} position-relative' (click)="onViewTask()" style='cursor: pointer;'></div>`);
        $(`.${overlapClass}`).append(`<div class='${overlayClass} ${task.color} position-absolute' style='top: 0;bottom: 0;left: 0;right: 0;'><div>${task.topic}</div><div>${task.activity}</div><div>Detail2</div></div>`);
        index++;
      }
    }, err => {
      console.log(err)
    })
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
            let endtime = Number(timeList[0]) + 29
            startWorkingTime = convertTimeString(starttime);
            endWorkingTime = convertTimeString(endtime);
          } else {
            let starttime = Number(timeList[0])
            let endtime = Number(timeList[timeList.length - 1]) + 29
            startWorkingTime = convertTimeString(starttime);
            endWorkingTime = convertTimeString(endtime);
          }
          // Call TS fucntion
          self.taskService.updateCurrentTimeTask(startWorkingTime, endWorkingTime)

          // Call Modal
          self.commitDataTaskModal();
          let modal = new SpinModal();
          modal.initial('#task-modal', { show: true, backdrop: 'static', keyboard: true })
          modal.onClose('#task-modal', function () {
            $('.timestamp .ui-selected').removeClass('ui-selected')
          })
        }
      },
    });
  }

  commitDataTaskModal(){
    console.log('commitDataTaskModal')
    this.taskModalChild.onTimestampCommit();
  }

  onViewTask() {
    console.log('onViewTask')
  }


}
