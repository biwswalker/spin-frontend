import { DepartmentService } from './../../../providers/department.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentInfoComponent } from './department-info/department-info.component';
import { DepartmentSearchComponent } from './department-search/department-search.component';
import { DepartmentModalComponent } from './department-modal/department-modal.component';
import { Mode } from '../../../config/properties';
import { Department } from '../../../models/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  @ViewChild(DepartmentInfoComponent) departmentInfo;
  @ViewChild(DepartmentSearchComponent) departmentSearch;
  @ViewChild(DepartmentModalComponent) departmentModal;


  protected deptId: number;
  constructor(protected departmentService: DepartmentService) { }

  ngOnInit() {
  }

  getData(key) {
    console.log('key = ' + key);
    this.deptId = key;
    this.getDepartmentInfo();
  }

  getDepartmentInfo() {
    this.departmentService.findByDeptId(this.deptId).subscribe(
      res => {
        this.departmentInfo.department = res;
      }
    );
  }

  createDepartment() {
    this.departmentModal.mode = Mode.I;
    this.departmentModal.department = new Department();
    this.departmentModal.ngOnInit();
    this.departmentService.onOpenModal();
  }

  onCheckState(key) {
    console.log('onCheckState = ' + key);
    if (key) {
      this.departmentSearch.ngOnInit();
    }
  }

}
