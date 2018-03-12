import { Mode } from './../../../../config/properties';
import { Responsibility } from './../../../../models/responsibility';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ResponsibilityService } from '../../../../providers/responsibility.service';
import { ResponsibilityInfoComponent } from '../responsibility-info/responsibility-info.component';

@Component({
  selector: 'app-responsibility-modal',
  templateUrl: './responsibility-modal.component.html',
  styleUrls: ['./responsibility-modal.component.scss']
})
export class ResponsibilityModalComponent implements OnInit {

  protected responsibilityGroup: FormGroup;
  public responsibility: Responsibility;
  protected mode: string;
  protected isActive: boolean = true;

  public headerTxt: string = '';
  public iconName: string = '';

  constructor(protected responsibilityService: ResponsibilityService) {
    this.responsibility = new Responsibility();

    this.responsibilityService.key.subscribe(
      res => {
        this.getRespInfo(res);
        console.log(this.responsibility);
        this.mode = Mode.E;
        this.validateForm();
        console.log(this.responsibility.respId);

      }
    );
  }

  ngOnInit() {
    console.log('ngOnInit');
    if (this.mode === Mode.E) {
      this.validateForm();
      this.mode = Mode.E;
      this.headerTxt = 'แก้ไข';
    } else {
      this.createForm();
      this.mode = Mode.I;
      this.headerTxt = 'เพิ่ม';
    }
  }

  getRespInfo(respId) {
    this.responsibilityService.findByRespId(respId).subscribe(
      res => {
        this.responsibility = res;
      }
    );
  }



  createForm() {
    this.responsibilityGroup = new FormGroup({
      respName: new FormControl(null, Validators.required),
      respAbbr: new FormControl(null, Validators.required),
      respDesc: new FormControl('', Validators.required),
      activeFlag: new FormControl(''),
      respId: new FormControl(null),
      versionId: new FormControl(null)
    })
  }

  validateForm() {
    this.responsibilityGroup = new FormGroup({
      respName: new FormControl(this.responsibility.respName, Validators.required),
      respAbbr: new FormControl(this.responsibility.respAbbr, Validators.required),
      respDesc: new FormControl(this.responsibility.respDesc, Validators.required),
      activeFlag: new FormControl(this.responsibility.activeFlag),
      respId: new FormControl(this.responsibility.respId),
      versionId: new FormControl(this.responsibility.versionId)
    })
  }

  oncloseModal() {
    this.responsibilityService.onCloseModal();
  }

  onSubmit() {
    if (this.responsibilityGroup.valid) {
      this.responsibilityGroup.controls['activeFlag'].setValue(this.isActive ? 'A' : 'I');
      console.log('responsibilityGroup = {}', this.responsibilityGroup.value);
      if (this.mode === Mode.I) {
        this.responsibilityService.createResponsibility(this.responsibilityGroup.value).subscribe(
          res => {
            console.log(res);
          }
        );
      } else {
        this.responsibilityGroup.controls['respId'].setValue(this.responsibility.respId);
        this.responsibilityGroup.controls['versionId'].setValue(this.responsibility.versionId);
        this.responsibilityService.updateResponsibility(this.responsibilityGroup.value).subscribe(
          res => {
            console.log(res);
          }
        );
      }
    }
    this.oncloseModal();
  }

  onChangeActiveFlag() {
    this.isActive = !this.isActive;
  }

}
