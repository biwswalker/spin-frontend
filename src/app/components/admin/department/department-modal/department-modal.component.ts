import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from '../../../../models/department';
import { DepartmentService } from '../../../../providers/department.service';
import { EventMessagesService } from '../../../../providers/utils/event-messages.service';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { Mode } from '../../../../config/properties';

@Component({
  selector: 'app-department-modal',
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.scss']
})
export class DepartmentModalComponent implements OnInit {

  public departmentGroup: FormGroup;
  public department: Department;
  public mode: string;
  public isActive: boolean = true;

  public headerTxt: string = '';

  @Output() changeState = new EventEmitter<boolean>();
  constructor(protected departmentService: DepartmentService, protected eventMessagesService: EventMessagesService,
    protected utilsService: UtilsService) {
    this.department = new Department();

    this.departmentService.key.subscribe(
      res => {
        this.getDepartmentInfo(res);
        console.log(this.department);
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
      this.department = new Department();
      this.validateForm();
      this.mode = Mode.I;
      this.headerTxt = 'เพิ่ม';
    }
  }

  getDepartmentInfo(deptId) {
    this.departmentService.findByDeptId(deptId).subscribe(
      res => {
        this.department = res;
        this.isActive = this.department.activeFlag == 'A' ? true : false;
      }
    );
  }

  validateForm() {
    this.departmentGroup = new FormGroup({
      deptId: new FormControl(this.department.deptId),
      deptName: new FormControl(this.department.deptName, Validators.required),
      deptAbbr: new FormControl(this.department.deptAbbr, Validators.required),
      activeFlag: new FormControl(this.department.activeFlag),
      remark: new FormControl(this.department.remark),
      versionId: new FormControl(this.department.versionId)
    })
  }

  oncloseModal() {
    this.departmentService.onCloseModal();
  }

  onSubmit() {
    this.utilsService.findInvalidControls(this.departmentGroup);
    if (this.departmentGroup.valid) {
      this.departmentGroup.controls['activeFlag'].setValue(this.isActive ? 'A' : 'I');

      console.log('departmentGroup = {}', this.departmentGroup.value);
      if (this.mode === Mode.I) {
        this.departmentService.createDepartment(this.departmentGroup.value).subscribe(
          res => {
            console.log(res);
            this.changeState.emit(true);
            this.eventMessagesService.onInsertSuccess(res.deptId);
          },
          error => {
            console.log(error);
            this.eventMessagesService.onInsertError(error);
          }
        );
      } else {
        this.departmentGroup.controls['deptId'].setValue(this.department.deptId);
        this.departmentGroup.controls['versionId'].setValue(this.department.versionId);
        this.departmentService.updateDepartment(this.departmentGroup.value).subscribe(
          res => {
            console.log(res);
            this.changeState.emit(true);
            this.eventMessagesService.onUpdateSuccess(res.deptId);
          },
          error => {
            console.log(error);
            this.eventMessagesService.onUpdateError(error);
          }
        );
      }

      this.oncloseModal();
    } else {
      console.log('else {}', this.departmentGroup);
    }

  }

  onChangeActiveFlag() {
    this.isActive = !this.isActive;
  }


}
