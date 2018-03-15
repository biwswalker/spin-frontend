import { Mode } from './../../../../config/properties';
import { Responsibility } from './../../../../models/responsibility';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ResponsibilityService } from '../../../../providers/responsibility.service';
import { ResponsibilityInfoComponent } from '../responsibility-info/responsibility-info.component';
import { error } from 'protractor';
import { EventMessagesService } from '../../../../providers/utils/event-messages.service';
import { UtilsService } from '../../../../providers/utils/utils.service';

declare var $: any;
@Component({
  selector: 'app-responsibility-modal',
  templateUrl: './responsibility-modal.component.html',
  styleUrls: ['./responsibility-modal.component.scss']
})
export class ResponsibilityModalComponent implements OnInit {

  public responsibilityGroup: FormGroup;
  public responsibility: Responsibility;
  public mode: string;
  public isActive: boolean = true;

  public headerTxt: string = '';
  @Output() changeState = new EventEmitter<boolean>();

  constructor(protected responsibilityService: ResponsibilityService, private utilsService: UtilsService, protected eventMessagesService: EventMessagesService) {
    this.responsibility = new Responsibility();

    this.responsibilityService.key.subscribe(
      res => {
        this.getRespInfo(res);
        console.log(this.responsibility);
        this.mode = Mode.E;
        this.headerTxt = 'แก้ไข';
        this.validateForm();
        console.log(this.responsibility.respId);

      }
    );
  }

  ngOnInit() {
    if (this.mode === Mode.E) {
      this.validateForm();
      this.mode = Mode.E;
      this.headerTxt = 'แก้ไข';
    } else {
      this.responsibility = new Responsibility();
      this.validateForm();
      this.mode = Mode.I;
      this.headerTxt = 'เพิ่ม';
    }
  }

  getRespInfo(respId) {
    this.responsibilityService.findByRespId(respId).subscribe(
      res => {
        this.responsibility = res;
        this.isActive = this.responsibility.activeFlag == 'A' ? true : false;
      }
    );
  }


  validateForm() {
    this.responsibilityGroup = new FormGroup({
      respName: new FormControl(this.responsibility.respName, Validators.required),
      respAbbr: new FormControl(this.responsibility.respAbbr, Validators.required),
      respDesc: new FormControl(this.responsibility.respDesc),
      activeFlag: new FormControl(this.responsibility.activeFlag),
      respId: new FormControl(this.responsibility.respId),
      versionId: new FormControl(this.responsibility.versionId)
    })
  }

  oncloseModal() {
    this.responsibilityService.onCloseModal();
  }

  onSubmit() {
    this.utilsService.findInvalidControls(this.responsibilityGroup);
    if (this.responsibilityGroup.valid) {
      this.responsibilityGroup.controls['activeFlag'].setValue(this.isActive ? 'A' : 'I');
      console.log('responsibilityGroup = {}', this.responsibilityGroup.value);
      if (this.mode === Mode.I) {
        this.responsibilityService.createResponsibility(this.responsibilityGroup.value).subscribe(
          res => {
            console.log(res);
            this.changeState.emit(true);
            this.eventMessagesService.onInsertSuccess(res.respId);
          },
          error => {
            console.log(error);
            this.eventMessagesService.onInsertError(error);
          }
        );
      } else {
        this.responsibilityGroup.controls['respId'].setValue(this.responsibility.respId);
        this.responsibilityGroup.controls['versionId'].setValue(this.responsibility.versionId);
        this.responsibilityService.updateResponsibility(this.responsibilityGroup.value).subscribe(
          res => {
            console.log(res);
            this.changeState.emit(true);
            this.eventMessagesService.onUpdateSuccess(res.respId);
          },
          error => {
            console.log(error);
            this.eventMessagesService.onUpdateError(error);
          }
        );
      }

      this.oncloseModal();
    } else {
      console.log('else {}', this.responsibilityGroup);
    }

  }

  onChangeActiveFlag() {
    this.isActive = !this.isActive;
  }

}
