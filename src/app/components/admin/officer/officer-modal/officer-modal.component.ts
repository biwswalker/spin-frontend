import { EventMessagesService } from './../../../../providers/utils/event-messages.service';
import { Mode } from './../../../../config/properties';
import { OfficerService } from './../../../../providers/officer.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Officer } from '../../../../models/officer';
import { Department } from '../../../../models/department';
import { Position } from '../../../../models/position';
import { UtilsService } from '../../../../providers/utils/utils.service';

@Component({
  selector: 'app-officer-modal',
  templateUrl: './officer-modal.component.html',
  styleUrls: ['./officer-modal.component.scss']
})
export class OfficerModalComponent implements OnInit {

  public officerGroup: FormGroup;
  public officer: Officer;
  public mode: string;
  public isActive: boolean = true;

  public headerTxt: string = '';



  public departmentList: Department[];
  public deptId: number = 0;

  public positionList: Position[];
  public positionId: number = 0;
  public startDate: string;
  public positionName: any;
  public deptName: any;
  @Output() changeState = new EventEmitter<boolean>();


  constructor(private officerService: OfficerService, private utilsService: UtilsService, private eventMessagesService: EventMessagesService) {
    this.officer = new Officer();

    this.officerService.key.subscribe(
      res => {
        this.getOfficerInfo(res);
        console.log(this.officer);
        this.mode = Mode.E;
        this.headerTxt = 'แก้ไข';
        this.validateForm();
        console.log(this.officer.officeId);

      }
    );
  }

  ngOnInit() {
    //autocomplete department
    this.officerService.findAutocompleteDepartment().subscribe(
      data => {
        this.departmentList = data;
      }
    );
    //autocomplete position
    this.officerService.findAutocompletePosition().subscribe(
      data => {
        this.positionList = data;
      }
    );

    if (this.mode === Mode.E) {
      this.validateForm();
      this.mode = Mode.E;
      this.headerTxt = 'แก้ไข';
    } else {
      this.officer = new Officer();
      this.validateForm();
      this.mode = Mode.I;
      this.headerTxt = 'เพิ่ม';
    }
  }

  oncloseModal() {
    this.officerService.onCloseModal();
  }

  onSubmit() {
    if (this.officerGroup.valid) {
      this.officerGroup.controls['activeFlag'].setValue(this.isActive ? 'A' : 'I');
      this.officerGroup.controls['startDate'].setValue(this.utilsService.convertDatePickerToThDate(this.startDate));
      this.officerGroup.controls['deptId'].setValue(this.deptId);
      this.officerGroup.controls['positionId'].setValue(this.positionId);

      console.log('officerGroup = {}', this.officerGroup.value);
      if (this.mode === Mode.I) {
        this.officerService.createOfficer(this.officerGroup.value).subscribe(
          res => {
            console.log(res);
            this.changeState.emit(true);
            this.eventMessagesService.onInsertSuccess(res.officeId);
          },
          error => {
            console.log(error);
            this.eventMessagesService.onInsertError(error);
          }
        );
      } else {
        console.log('mode update');
        console.log(this.deptId);
        console.log(this.positionId);
        this.officerGroup.controls['officeId'].setValue(this.officer.officeId);
        this.officerGroup.controls['versionId'].setValue(this.officer.versionId);
        this.officerService.updateOfficer(this.officerGroup.value).subscribe(
          res => {
            console.log(res);
            this.changeState.emit(true);
            this.eventMessagesService.onUpdateSuccess(res.officeId);
          },
          error => {
            console.log(error);
            this.eventMessagesService.onUpdateError(error);
          }
        );
      }

      this.oncloseModal();
    } else {
      console.log('else {}', this.officerGroup);
    }
  }

  getOfficerInfo(officerId) {
    this.officerService.findByOfficeId(officerId).subscribe(
      res => {
        this.officer = res;
        this.deptId = this.officer.deptId;
        this.positionId = this.officer.positionId;
        this.initialData();
        console.log(this.officer.deptId);
      }
    );
  }

  validateForm() {
    this.officerGroup = new FormGroup({
      officeId: new FormControl(this.officer.officeId, Validators.required),
      titleTh: new FormControl(this.officer.titleTh, Validators.required),
      firstNameTh: new FormControl(this.officer.firstNameTh, Validators.required),
      lastNameTh: new FormControl(this.officer.lastNameTh, Validators.required),
      titleEn: new FormControl(this.officer.titleEn),
      firstNameEn: new FormControl(this.officer.firstNameEn),
      lastNameEn: new FormControl(this.officer.lastNameEn),
      startDate: new FormControl(this.officer.startDate, Validators.required),
      deptName: new FormControl(this.deptName),
      positionName: new FormControl(this.positionName),
      deptId: new FormControl(this.officer.deptId),
      positionId: new FormControl(this.officer.deptId),
      activeFlag: new FormControl(this.officer.activeFlag),
      versionId: new FormControl(this.officer.versionId)
    })

  }

  onChangeActiveFlag() {
    this.isActive = !this.isActive;
  }

  onChangeDepartment(event) {
    if (this.deptId != event.item.deptId) {
      this.deptId = event.item.deptId;
      console.log('deptId ' + this.deptId);
    }
  }

  onChangePosition(event) {
    if (this.positionId != event.item.positionId) {
      this.positionId = event.item.positionId;
      console.log('positionId ' + this.positionId);
    }
  }

  initialData() {
    console.log('initialTime ' + this.officer.startDate);
    console.log('mode ' + this.mode);
    this.startDate = this.officer.startDate ? this.utilsService.displayCalendarDate(this.officer.startDate) : '';
    this.officerService.findDepartmentById(this.officer.deptId).subscribe(
      data => {
        this.officerGroup.patchValue({ deptName: data.deptName });
      }
    );

    this.officerService.findPositionById(this.officer.positionId).subscribe(
      data => {
        this.officerGroup.patchValue({ positionName: data.positionName });
      }
    );
  }



}
