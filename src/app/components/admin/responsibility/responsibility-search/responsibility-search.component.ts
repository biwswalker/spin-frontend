import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormControl } from '@angular/forms';
import { ResponsibilityService } from './../../../../providers/responsibility.service';
import { Observable } from 'rxjs/Observable';
import { Responsibility } from './../../../../models/responsibility';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { AsyncSubject } from 'rxjs/AsyncSubject';
import 'rxjs/Rx';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-responsibility-search',
  templateUrl: './responsibility-search.component.html',
  styleUrls: ['./responsibility-search.component.scss', '../responsibility.component.scss']
})
export class ResponsibilitySearchComponent implements OnInit {

  public responsibilities: Responsibility[];

  @Output() messageEvent = new EventEmitter<number>();

  public page = 1;
  public size = 15;

  public throttle = 1000;
  public scrollDistance = 1;
  protected hasCriteria: boolean = false;
  protected criteriaValue: string;

  constructor(protected responsibilityService: ResponsibilityService) {
  }

  ngOnInit() {
    this.responsibilities = [];
    this.getAllResponsibility();
  }



  getAllResponsibility() {
    console.log('getAllResponsibility');
    this.page = 1;
    this.responsibilityService.findAllPageable(this.page, this.size).subscribe(
      collection => {
        this.responsibilities = collection;
        this.messageEvent.emit(collection[0].respId);

        this.page += 1;
      }
    );
  }

  onChangeResp(resp) {
    console.log(resp);
    this.messageEvent.emit(resp.respId);
  }

  onSearchByCriteria(criteria) {
    console.log(criteria);
    this.page = 1;
    if (criteria) {
      this.criteriaValue = criteria;
      this.responsibilityService.findByCriteria(criteria, this.page, this.size).subscribe(
        collection => {
          this.responsibilities = collection;
          if (collection.length > 0) {
            this.messageEvent.emit(collection[0].respId);
          }
          this.page += 1;
        }
      );
    } else {
      this.criteriaValue = '';
      this.getAllResponsibility();
    }
  }

  onScrollDown() {
    console.log('onScrollDown');
    this.responsibilityService.findAllPageable(this.page, this.size).subscribe(
      collection => {
        if (collection) {
          this.page += 1;
          this.responsibilities = this.responsibilities.concat(collection);
        }
      }
    );
  }


}
