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

  constructor(protected responsibilityService: ResponsibilityService) {
    this.responsibility = new Responsibility();
    this.responsibilityService.responsibility.subscribe(
      res => {
        this.responsibility = res;
        console.log(this.responsibility);
      }
    );
  }

  ngOnInit() {

    if (this.responsibility) {
      this.validateForm();
    } else {
      this.createForm();
    }
  }




  createForm() {
    this.responsibilityGroup = new FormGroup({
      respName: new FormControl(null, Validators.required),
      respAbbr: new FormControl(null, Validators.required),
      respDesc: new FormControl(''),
      activeFlag: new FormControl(''),
      respId: new FormControl(null),
      versionId: new FormControl(null)
    })
  }

  validateForm() {
    console.log(this.responsibility);
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
    console.log('onSubmit');
    if (this.responsibilityGroup.valid) {
      //  this.responsibilityService.
    }
  }

}
