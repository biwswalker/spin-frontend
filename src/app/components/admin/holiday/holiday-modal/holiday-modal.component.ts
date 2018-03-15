import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Holiday } from '../../../../models/holiday';
import { HolidayService } from '../../../../providers/holiday.service';
import { EventMessagesService } from '../../../../providers/utils/event-messages.service';
import { Mode } from '../../../../config/properties';
import { UtilsService } from './../../../../providers/utils/utils.service';

@Component({
  selector: 'app-holiday-modal',
  templateUrl: './holiday-modal.component.html',
  styleUrls: ['./holiday-modal.component.scss']
})
export class HolidayModalComponent implements OnInit {


  public holidayGroup: FormGroup;
  public holiday: Holiday;
  public mode: string;
  public isActive: boolean = true;

  public holDate: string;
  public headerTxt: string = '';

  @Output() changeState = new EventEmitter<boolean>();


  constructor(protected holidayService: HolidayService, protected eventMessagesService: EventMessagesService,
    protected utilsService: UtilsService) {
    this.holiday = new Holiday();

    this.holidayService.key.subscribe(
      res => {
        this.getHolidayInfo(res);
        console.log(this.holiday);
        this.mode = Mode.E;
        this.headerTxt = 'แก้ไข';
        this.validateForm();
      }
    );
  }

  ngOnInit() {
    if (this.mode === Mode.E) {
      this.validateForm();
      this.mode = Mode.E;
      this.headerTxt = 'แก้ไข';
    } else {
      this.holiday = new Holiday();
      this.validateForm();
      this.mode = Mode.I;
      this.headerTxt = 'เพิ่ม';
    }
  }

  getHolidayInfo(respId) {
    this.holidayService.findByHolId(respId).subscribe(
      res => {
        this.holiday = res;
        this.isActive = this.holiday.activeFlag == 'A' ? true : false;
        this.holDate = this.holiday.holDate ? this.utilsService.displayCalendarDate(this.holiday.holDate) : '';
      }
    );
  }

  validateForm() {
    this.holidayGroup = new FormGroup({
      holId: new FormControl(this.holiday.holId, Validators.required),
      holName: new FormControl(this.holiday.holName, Validators.required),
      holDate: new FormControl(this.holiday.holDate, Validators.required),
      activeFlag: new FormControl(this.holiday.activeFlag),
      remark: new FormControl(this.holiday.remark),
      versionId: new FormControl(this.holiday.versionId)
    })
  }

  oncloseModal() {
    this.holidayService.onCloseModal();
  }

  onSubmit() {
    this.utilsService.findInvalidControls(this.holidayGroup);
    if (this.holidayGroup.valid) {
      this.holidayGroup.controls['activeFlag'].setValue(this.isActive ? 'A' : 'I');

      this.holidayGroup.controls['holDate'].setValue(this.utilsService.convertDatePickerToThDate(this.holDate));
      console.log('holidayGroup = {}', this.holidayGroup.value);
      if (this.mode === Mode.I) {
        this.holidayService.createHoliday(this.holidayGroup.value).subscribe(
          res => {
            console.log(res);
            this.changeState.emit(true);
            this.eventMessagesService.onInsertSuccess(res.holId);
          },
          error => {
            console.log(error);
            this.eventMessagesService.onInsertError(error);
          }
        );
      } else {
        this.holidayGroup.controls['holId'].setValue(this.holiday.holId);
        this.holidayGroup.controls['versionId'].setValue(this.holiday.versionId);
        this.holidayService.updateHoliday(this.holidayGroup.value).subscribe(
          res => {
            console.log(res);
            this.changeState.emit(true);
            this.eventMessagesService.onUpdateSuccess(res.holId);
          },
          error => {
            console.log(error);
            this.eventMessagesService.onUpdateError(error);
          }
        );
      }

      this.oncloseModal();
    } else {
      console.log('else {}', this.holidayGroup);
    }

  }

  onChangeActiveFlag() {
    this.isActive = !this.isActive;
  }

}
