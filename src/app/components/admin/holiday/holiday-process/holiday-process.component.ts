import { Component, OnInit } from '@angular/core';
import { Holiday } from '../../../../models/holiday';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-holiday-process',
  templateUrl: './holiday-process.component.html',
  styleUrls: ['./holiday-process.component.scss']
})
export class HolidayProcessComponent implements OnInit {

  public holiday: Holiday = new Holiday();
  protected holidayGroup: FormGroup;

  constructor() {
    this.holiday = new Holiday();
    //  this.validateForm();
  }

  ngOnInit() {
    console.log('holiday = {}', this.holiday);
  }

  // validateForm() {
  //   this.holidayGroup = new FormGroup({
  //     holName: new FormControl(this.holiday.holName, Validators.required),
  //     holDate: new FormControl(this.holiday.holDate, Validators.required),
  //     remark: new FormControl(this.holiday.remark),
  //     activeFlag: new FormControl(this.holiday.activeFlag),
  //     holId: new FormControl(this.holiday.holId),
  //     versionId: new FormControl(this.holiday.versionId)
  //   })
  // }

}
