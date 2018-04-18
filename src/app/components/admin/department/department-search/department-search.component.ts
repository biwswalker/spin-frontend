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
  public size = 20;

  public throttle = 1000;
  public scrollDistance = 1;
  protected criteriaValue: string;

  public totalElements = 0;
  constructor(protected departmentService: DepartmentService) { }


  ngOnInit() {
    this.departments = [];
    this.onSearchByCriteria('');
  }

  onChangeDepartment(department) {
    this.messageEvent.emit(department.deptId);
  }

  onSearchByCriteria(criteria) {
    console.log(criteria);
    this.page = 1;
    this.criteriaValue = criteria;
    this.departmentService.findByCriteria(criteria, this.page, this.size).subscribe(
      collection => {
        this.departments = collection.content;
        this.totalElements = collection.totalElements;
        if (collection.length > 0) {
          this.messageEvent.emit(this.departments[0].deptId);
        }
        this.page += 1;
      }
    );
  }



  onScrollDown() {
    this.departmentService.findByCriteria(this.criteriaValue, this.page, this.size).subscribe(
      collection => {
        this.departments = this.departments.concat(collection.content);
        this.page += 1;
      }
    );
  }

}
