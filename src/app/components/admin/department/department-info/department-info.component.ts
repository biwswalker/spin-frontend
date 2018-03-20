import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './../../../../providers/department.service';
import { Department } from '../../../../models/department';


@Component({
  selector: 'app-department-info',
  templateUrl: './department-info.component.html',
  styleUrls: ['./department-info.component.scss']
})
export class DepartmentInfoComponent implements OnInit {

  public department: Department;

  constructor(protected departmentService: DepartmentService) { }

  ngOnInit() {
    this.department = new Department();
  }

  editDepartment(event) {
    this.departmentService.emitDepartment(this.department.deptId);
    this.departmentService.onOpenModal();
  }

}
