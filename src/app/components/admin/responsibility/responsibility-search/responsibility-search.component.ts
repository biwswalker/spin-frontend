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
  styleUrls: ['./responsibility-search.component.scss']
})
export class ResponsibilitySearchComponent implements OnInit {

  public responsibilities: Responsibility[];

  @Output() messageEvent = new EventEmitter<number>();

  public page = 1;
  public size = 20;

  public throttle = 1000;
  public scrollDistance = 1;
  protected criteriaValue: string;
  public totalElements = 0;

  constructor(protected responsibilityService: ResponsibilityService) {
  }

  ngOnInit() {
    this.responsibilities = [];
    this.onSearchByCriteria('');
  }

  onChangeResp(resp) {
    this.messageEvent.emit(resp.respId);
  }

  onSearchByCriteria(criteria) {
    this.page = 1;
    this.criteriaValue = criteria;
    this.responsibilityService.findByCriteria(criteria, this.page, this.size).subscribe(
      collection => {
        this.responsibilities = collection.content;
        this.totalElements = collection.totalElements;
        if (collection.length > 0) {
          this.messageEvent.emit(this.responsibilities[0].respId);
        }
        this.page += 1;
      }
    );
  }

  onScrollDown() {
    this.responsibilityService.findByCriteria(this.criteriaValue, this.page, this.size).subscribe(
      collection => {
        this.responsibilities = this.responsibilities.concat(collection.content);
        if (collection.length > 0) {
          this.messageEvent.emit(this.responsibilities[0].respId);
        }
        this.page += 1;
      }
    );

  }


}
