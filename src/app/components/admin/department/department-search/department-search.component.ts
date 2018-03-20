import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DepartmentService } from './../../../../providers/department.service';
import { Department } from '../../../../models/department';

@Component({
  selector: 'app-department-search',
  templateUrl: './department-search.component.html',
  styleUrls: ['./department-search.component.scss']
})
export class DepartmentSearchComponent implements OnInit {

  public departments: Department[];

  @Output() messageEvent = new EventEmitter<number>();

  public page = 1;
  public size = 13;

  public throttle = 1000;
  public scrollDistance = 1;
  protected criteriaValue: string;
  constructor(protected departmentService: DepartmentService) { }


  ngOnInit() {
    this.departments = [];
    this.getAllDepartment();
  }

  getAllDepartment() {
    console.log('getAllDepartment');
    this.page = 1;
    this.departmentService.findAllPageable(this.page, this.size).subscribe(
      collection => {
        this.departments = collection;
        this.messageEvent.emit(collection[0].deptId);
        this.page += 1;
      }
    );
  }

  onChangeDepartment(department) {
    console.log(department);
    this.messageEvent.emit(department.deptId);
  }

  onSearchByCriteria(criteria) {
    console.log(criteria);
    this.page = 1;
    if (criteria) {
      this.criteriaValue = criteria;
      this.departmentService.findByCriteria(criteria, this.page, this.size).subscribe(
        collection => {
          this.departments = collection;
          if (collection.length > 0) {
            this.messageEvent.emit(collection[0].deptId);
          }
          this.page += 1;
        }
      );
    } else {
      this.criteriaValue = '';
      this.getAllDepartment();
    }
  }


  onScrollDown() {
    console.log('onScrollDown' + this.criteriaValue);
    if (this.criteriaValue) {
      this.departmentService.findByCriteria(this.criteriaValue, this.page, this.size).subscribe(
        collection => {
          this.departments = this.departments.concat(collection);
          this.page += 1;
        }
      );
    } else {
      this.departmentService.findAllPageable(this.page, this.size).subscribe(
        collection => {
          console.log(collection)
          if (collection) {
            this.page += 1;
            this.departments = this.departments.concat(collection);
          }
        }
      );
    }

  }

}
