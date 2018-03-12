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
  public currentResp: Observable<Responsibility[]>;
  // public _responsibilities: Observable<Responsibility[]>;
  private _responsibilities: BehaviorSubject<Responsibility[]>;

  @Output() messageEvent = new EventEmitter<number>();

  public page = 1;
  public size = 20;

  public throttle = 1000;
  public scrollDistance = 1;
  protected hasCriteria: boolean = false;
  protected criteriaValue: string;

  constructor(protected responsibilityService: ResponsibilityService) {
    this._responsibilities = new BehaviorSubject<Responsibility[]>([]);
  }

  ngOnInit() {
    this.getAllResponsibility();
  }



  getAllResponsibility() {
    this.page = 1;
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
    this.page = this.page + 1;
    this.getNext();
    this.currentResp = this.responsibilities;
    //   this.responsibilities = Observable.merge(this.currentResp, this._responsibilities);

    // this.currentResp = this._responsibilities.asObservable();
    this.responsibilities = Observable.merge(this.currentResp, this._responsibilities.asObservable()).do(
      data => {
        console.log('end data {}', data);
      }
    );
    //  this.responsibilities = this.currentResp.merge(this._responsibilities);


  }

  getNext() {
    this.responsibilityService.findAllPageable(this.page, this.size).subscribe(
      data => {
        console.log('data {}', data);
        this._responsibilities.next(data);
      }
    );
  }

}
