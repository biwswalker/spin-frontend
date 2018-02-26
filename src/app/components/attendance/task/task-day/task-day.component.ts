import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TaskService } from '../../../../providers/task.service';
import { Observable } from 'rxjs/Observable';
import { TaskForm } from '../../../../forms/taskForm';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
declare var $: any;
// declare var SpinDatePicker: any;
@Component({
  selector: 'task-day',
  templateUrl: './task-day.component.html',
  styleUrls: ['./task-day.component.scss']
})
export class TaskDayComponent implements OnInit, AfterViewInit {

  private subjectDate = new BehaviorSubject<string>(this.utilsService.getCurrentThDate());
  private crrDate = this.subjectDate.asObservable();
  public taskForms = new Observable<TaskForm[]>();

  constructor(private taskService: TaskService, private utilsService: UtilsService) {
    // Async
    this.crrDate.subscribe(date => {
      this.taskForms = this.taskService.findTaskByDate(date);
    })
    // End Async
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // let dap = new SpinDatePicker();
    // dap.initialGGWP();
    var disabledDays = ["25610221", "25610215", "25610218", "25610219"];
    // Call DatePicker
    let datepickerId = '#workingDatePicker'
    let self = this;
    $(datepickerId).datepicker({
      isBE: true,
      onSelect: function (dateText, inst) {
        self.subjectDate.next(dateText);
      },
      beforeShowDay: function (date) {
        var m = date.getMonth(), d = date.getDate(), y = date.getFullYear();
        let dat = y + '0' + (m + 1) + '' + d;
        if(dat == '20180221' || dat == '20180211'){
          return [true, 'holiday', ''];
        }
        if(dat == '20180210' || dat == '20180212'){
          return [true, 'unstamped', ''];
        }
        return [true];
      }
    });
    // Sets stye
    $(datepickerId).addClass('w-100');
    $($(datepickerId).find('.ui-datepicker-inline')).addClass('w-100');
    $($(datepickerId).find('.ui-datepicker-inline')).css({ 'max-width': '400px', 'margin-left': 'auto', 'margin-right': 'auto' });
    // End Call DatePicker
  }
}