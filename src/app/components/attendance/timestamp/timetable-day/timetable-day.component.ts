import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TaskService } from '../../../../providers/task.service';
import { TaskModalComponent } from '../../task/task-modal/task-modal.component';
import { Task } from '../../../../models/task';
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

  constructor(private taskService: TaskService) {
    this.taskService.findWorkingTaskByDate('25610222').subscribe(tasks => {
      console.log(tasks)
    }, err => {
      console.log(err)
    })
  }

  ngOnInit() {
    this.spinTimestamp();
  }

  ngAfterViewInit() {
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

  sampleInsertTask(){
    // console.log('sampleInsertTask')
    // let tasks = new Task();
    // tasks.workDate = '25610222';
    // tasks.workStartTime = '1430';
    // tasks.workEndTime = '1459';
    // tasks.topic = 'Dev spinning3';
    // tasks.activity = 'dev3';
    // tasks.color = 'red';
    // tasks.statusFlag = 'I';
    // tasks.doSelfFlag = 'N';
    // tasks.activeFlag = 'A';
    // tasks.ownerUserId = 'jannarong.sa'
    // tasks.taskPartnerList = [];
    // tasks.taskTagList = [];
    // this.taskService.insertTask(tasks).subscribe(callback => console.log(callback));
  }
}
