import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Officer } from '../../../../models/officer';
import { OfficerService } from './../../../../providers/officer.service';

@Component({
  selector: 'app-officer-search',
  templateUrl: './officer-search.component.html',
  styleUrls: ['./officer-search.component.scss', '../officer.component.scss']
})
export class OfficerSearchComponent implements OnInit {


  public officers: Officer[];

  public page = 1;
  public size = 13;

  public throttle = 1000;
  public scrollDistance = 1;
  protected criteriaValue: string;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private officerService: OfficerService) { }

  ngOnInit() {
    this.officers = [];
    if (this.criteriaValue) {
      this.onSearchByCriteria(this.criteriaValue);
    } else {
      this.getAllOfficer();
    }
  }



  getAllOfficer() {
    console.log('getAllOfficer');
    this.page = 1;
    this.officerService.findAllPageable(this.page, this.size).subscribe(
      collection => {
        console.log('collection ', collection);
        this.officers = collection;
        console.log('collection[0].officeId ', collection[0].officeId);
        this.messageEvent.emit(collection[0].officeId);
        this.page += 1;
        console.log('end');
      }
    );
  }


  onSearchByCriteria(criteria) {
    console.log('criteria ', criteria);
    this.page = 1;
    if (criteria) {
      this.criteriaValue = criteria;
      this.officerService.findByCriteria(criteria, this.page, this.size).subscribe(
        collection => {
          this.officers = collection;
          if (collection.length > 0) {
            this.messageEvent.emit(collection[0].officeId);
          }
          this.page += 1;
        }
      );
    } else {
      this.criteriaValue = '';
      this.getAllOfficer();
    }
  }

  onChangeOfficer(officer) {
    console.log(officer);
    this.messageEvent.emit(officer.officeId);
  }

  onScrollDown() {
    console.log('onScrollDown' + this.criteriaValue);
    if (this.criteriaValue) {
      this.officerService.findByCriteria(this.criteriaValue, this.page, this.size).subscribe(
        collection => {
          this.officers = this.officers.concat(collection);

          this.page += 1;
        }
      );
    } else {
      this.officerService.findAllPageable(this.page, this.size).subscribe(
        collection => {
          if (collection) {
            this.page += 1;
            this.officers = this.officers.concat(collection);
          }
        }
      );
    }

  }

}
