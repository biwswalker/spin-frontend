import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TaskService } from '../../../../providers/task.service';
import { TaskModalComponent } from '../../task/task-modal/task-modal.component';
import { Task } from '../../../../models/task';
import { WorkingTime } from '../../../../config/properties';
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
  public worktable = WorkingTime

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.spinTimestamp();
  }

  ngAfterViewInit() {
    this.taskService.findWorkingTaskByDate('25610222').subscribe((tasks: Task[]) => {
      let index = 0;
      console.log(tasks)
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
        $(`.${overlapClass}`).append(`<div class='${overlayClass} ${task.color} position-absolute' style='top: 0;bottom: 0;left: 0;right: 0;'><div>${task.topic}</div><div>Detail1</div><div>Detail2</div><div>Detail3</div><div>Detail4</div></div>`);
        index++;
      }
    }, err => {
      console.log(err)
    })
    // $(".working1").wrapAll("<div class='ggwp1' style='position:relative'></div>");
    // $(".working2").wrapAll("<div class='ggwp2' style='position:relative'></div>");
    // $(".ggwp1").append("<div style='position: absolute;background: rgba(232, 0, 11, 0.4);top: 0;bottom: 0;left: 0;right: 0;'><div>Loader...</div><div>Detail1</div><div>Detail2</div><div>Detail3</div><div>Detail4</div></div>");
    // $(".ggwp2").append("<div style='position: absolute;background: rgba(232, 0, 11, 0.4);top: 0;bottom: 0;left: 0;right: 0;'>Loading...</div>");

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
          let modal = new SpinModal();
          modal.initial('#task-modal', { show: true, backdrop: 'static', keyboard: true })
          modal.onClose('#task-modal', function () {
            $('.timestamp .ui-selected').removeClass('ui-selected')
          })
        }
      },
    });
  }

  onViewTask() {
    console.log('onViewTask')
  }

  sampleInsertTask() {
    console.log('sampleInsertTask')
    let tasks = new Task();
    tasks.workDate = '25610222';
    tasks.workStartTime = '0700';
    tasks.workEndTime = '0859';
    tasks.topic = 'Dev ';
    tasks.activity = 'dev lasted';
    tasks.color = 'yellow';
    tasks.statusFlag = 'I';
    tasks.doSelfFlag = 'N';
    tasks.activeFlag = 'A';
    tasks.ownerUserId = 'jannarong.sa'
    tasks.taskPartnerList = [];
    tasks.taskTagList = [];
    this.taskService.insertTask(tasks).subscribe(callback => console.log(callback));
  }
}
