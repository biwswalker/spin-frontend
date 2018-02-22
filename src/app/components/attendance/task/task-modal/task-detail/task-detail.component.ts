import { TaskModalComponent } from './../task-modal.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Time } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss', '../task-modal.component.scss'],

})
export class TaskDetailComponent implements OnInit {


  @Output() messageEvent = new EventEmitter<string>();


  color: string = "";
  workStartTime: Time;
  workEndTime: Time;
  topic: string = "";
  activity: string = "";
  taskProject: string = "";
  workDate: any = "";
  ProjectList: any[] = [];
  statusFlag: boolean = false;
  colorStatus: boolean = false;
  projectDropdown: boolean = false;
  projectList: any[] = [];
  project: any = "";

  constructor(public taskModal: TaskModalComponent) { }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd mmm yyyy',
    dayLabels: {su: 'อา', mo: 'จ', tu: 'อ', we: 'พ', th: 'พฤ', fr: 'ศ', sa: 'ส'},
    monthLabels: { 1: 'มกราคม', 2: 'กุมภาพันธ์', 3: 'มีนาคม', 4: 'เมษายน', 5: 'พฤษภาคม', 6: 'มิถุนายน', 7: 'กรกฏาคม', 8: 'สิงหาคม', 9: 'กันยายน', 10: 'ตุลาคม', 11: 'พฤศจิกายน', 12: 'ธันวาคม' },
    showTodayBtn: false,
    monthSelector: false,
    yearSelector: false,
    disableHeaderButtons: false,
    editableDateField: false,
    openSelectorOnInputClick: true,
    firstDayOfWeek: 'su',

  };
  ngOnInit() {
    this.projectList = ['Project', 'Adobe', 'Break', 'Concat', 'Java Script', 'Angular', 'Jquery'];
  }

  onColorPick(color) {
    this.messageEvent.emit(color);
  }

  showData() {
    console.log(this.taskModal.taskForm)
  }

}



