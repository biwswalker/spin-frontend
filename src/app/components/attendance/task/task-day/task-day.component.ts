import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Task } from '../../../../models/task';
import { TaskService } from '../../../../providers/task.service';
import { Observable } from 'rxjs/Observable';
import { TaskForm } from '../../../../forms/taskForm';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { IMyDpOptions } from 'mydatepicker';
import { DateOptions, Format } from '../../../../config/properties';
declare var SpinTask: any;

@Component({
  selector: 'task-day',
  templateUrl: './task-day.component.html',
  styleUrls: ['./task-day.component.scss']
})
export class TaskDayComponent implements OnInit, AfterViewInit {

  public taskForms = new Observable<TaskForm[]>();
  public workingDate = '';
  private enDate = '';

  public dateOption: IMyDpOptions = {
    dateFormat: Format.DATE_PKR,
    dayLabels: DateOptions.DAY,
    monthLabels: DateOptions.MONTH,
    inline: true,
    showTodayBtn: false,
    monthSelector: false,
    yearSelector: false,
    disableHeaderButtons: false,
    editableDateField: false,
    openSelectorOnInputClick: true,
    firstDayOfWeek: 'su',
  };

  constructor(private taskService: TaskService, private utilsService: UtilsService) {
  }

  ngOnInit() {
    this.enDate = this.utilsService.getCurrentEnDate();
    this.taskForms = this.taskService.findTaskByDate(this.utilsService.convertEnDateToTh(this.enDate))
  }

  ngAfterViewInit(): void {
    let stask = new SpinTask();
    stask.initial();
  }

  selectedDate(){
    
  }

}
