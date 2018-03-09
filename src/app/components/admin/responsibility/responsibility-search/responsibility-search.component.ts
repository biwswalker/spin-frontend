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

  public responsibilities: Observable<Responsibility[]>;
  public oldResp: Observable<Responsibility[]>;
  public resp: AsyncSubject<Responsibility[]>;
  // public _responsibilities: BehaviorSubject<Responsibility[]>;
  public _responsibilities: Observable<Responsibility[]>;
  private loading: boolean = false;

  @Output() messageEvent = new EventEmitter<number>();

  public page = 1;
  public size = 11;

  public throttle = 1000;
  public scrollDistance = 1;
  protected hasCriteria: boolean = false;
  protected criteriaValue: string;
  private searchField: FormControl;

  constructor(protected responsibilityService: ResponsibilityService) {
    this._responsibilities = new BehaviorSubject<Responsibility[]>([]);
  }

  ngOnInit() {
    this.getAllResponsibility();
    //   this.getNext();
  }


  getAllResponsibility() {
    this.responsibilities = this.responsibilityService.findAllPageable(this.page, this.size).do(
      collection => {
        console.log(collection[0]);
        this.messageEvent.emit(collection[0].respId);
      }
    );
  }

  onChangeResp(resp) {
    console.log(resp);
    this.messageEvent.emit(resp.respId);
  }

  onSearchByCriteria(criteria) {
    console.log(criteria);
    if (criteria) {
      this.criteriaValue = criteria;
      this.responsibilities = this.responsibilityService.findByCriteria(criteria, this.page, this.size).do(
        collection => {
          console.log(collection);
          if (collection.length > 0) {
            this.messageEvent.emit(collection[0].respId);
          }
        }
      );
    } else {
      this.criteriaValue = '';
      this.getAllResponsibility();
    }
  }

  // onScrollDown() {
  //   console.log('onScrollDown');
  //   this.responsibilityService.findAllPageable(this.page, this.size).do(
  //     collection => {
  //     }
  //   );
  //   this.page += 1;
  // }


  onScrollDown() {
    console.log('onScrollDown');
    this.oldResp = this.responsibilities;
    console.log(this.oldResp);
    this._responsibilities = this.getNext();
    console.log(this._responsibilities);
    //this.responsibilities = Observable.merge(this.oldResp, this._responsibilities);
    if (this.oldResp) {
      this.responsibilities = Observable.merge(this.oldResp, this._responsibilities);
    }

  }

  getNext() {
    let obs = this.responsibilityService.findAllPageable(this.page + 1, this.size);
    obs.subscribe(
      res => {
        console.log(res);
      });

    return obs;
  }

}
