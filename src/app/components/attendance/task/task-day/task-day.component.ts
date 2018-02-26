import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TaskService } from '../../../../providers/task.service';
import { Observable } from 'rxjs/Observable';
import { TaskForm } from '../../../../forms/taskForm';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
declare var $: any;
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
    // Call DatePicker
    let datepickerId = '#workingDatePicker'
    let self = this;
    $(datepickerId).datepicker({
      isBE: true,
      onSelect: function (dateText, inst) {
        self.subjectDate.next(dateText);
      }
    });
    // Sets stye
    $(datepickerId).addClass('w-100');
    $($(datepickerId).find('.ui-datepicker-inline')).addClass('w-100');
    $($(datepickerId).find('.ui-datepicker-inline')).css({ 'max-width': '400px' });
    // End Call DatePicker
  }
}
