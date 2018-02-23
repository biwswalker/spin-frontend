import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModalComponent } from './../task-modal.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Time } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { IMyDpOptions } from 'mydatepicker';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss', '../task-modal.component.scss'],

})
export class TaskDetailComponent implements OnInit {


  @Output() messageEvent = new EventEmitter<string>();

  projectList: any[] = [];

  colorStatus: boolean = true;
  constructor(
    public taskModal: TaskModalComponent,
    private _sanitizer: DomSanitizer) { }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd mmm yyyy',
    dayLabels: { su: 'อา', mo: 'จ', tu: 'อ', we: 'พ', th: 'พฤ', fr: 'ศ', sa: 'ส' },
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
    this.validateDate();
    this.initialDefaultValue();
  }
  validateDate() {
    this.taskModal.taskDetailFormGroup = new FormGroup(
      {
        taskDetailStatusFlag: new FormControl((this.taskModal.taskForm.task.statusFlag == 'A' ? true : false)),
        taskDetailWorkDate: new FormControl(this.taskModal.taskForm.task.workDate, Validators.required),
        taskDetailStartTime: new FormControl(this.taskModal.taskForm.task.workStartTime, Validators.required),
        taskDetailEndTime: new FormControl(this.taskModal.taskForm.task.workEndTime, Validators.required),
        taskDetailTopic: new FormControl(this.taskModal.taskForm.task.workEndTime, Validators.required),
        taskDetailActivity: new FormControl(this.taskModal.taskForm.task.workEndTime, Validators.required),
        taskDetailProject: new FormControl(this.taskModal.taskForm.task.workEndTime, Validators.required)
      }
    )
  }

  initialDefaultValue() {
    this.taskModal.taskForm.task.activeFlag = 'A';
    this.taskModal.taskForm.task.statusFlag = 'I';
    this.taskModal.taskForm.task.doSelfFlag = 'N';
    this.taskModal.taskForm.task.taskPartnerList = [];
    this.taskModal.taskForm.task.taskTagList = [];
    this.projectList = [
      { id: 1, name: 'Java' },
      { id: 2, name: 'OOP' },
      { id: 3, name: 'Angular' },
      { id: 4, name: 'Jquery' },
      { id: 5, name: 'Java' },
      { id: 6, name: 'SpringBoot' }
    ];
  }

  autocompleListFormatter = (data: any) => {
    let html = `<span>${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  onColorPick(color) {
    if (color) {
      this.taskModal.taskForm.task.color = color;
      this.messageEvent.emit(color);
    }
  }

  initialProject() {

  }
}



