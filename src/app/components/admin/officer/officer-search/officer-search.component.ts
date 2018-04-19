import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Officer } from '../../../../models/officer';
import { OfficerService } from './../../../../providers/officer.service';

@Component({
  selector: 'app-officer-search',
  templateUrl: './officer-search.component.html',
  styleUrls: ['./officer-search.component.scss']
})
export class OfficerSearchComponent implements OnInit {


  public officers: Officer[];

  public page = 1;
  public size = 20;

  public throttle = 1000;
  public scrollDistance = 1;
  protected criteriaValue: string;

  public totalElements = 0;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private officerService: OfficerService) { }

  ngOnInit() {
    this.officers = [];
    this.onSearchByCriteria('');

  }



  onSearchByCriteria(criteria) {
    console.log(criteria);

    this.page = 1;
    this.criteriaValue = criteria;
    this.officerService.findByCriteria(criteria, this.page, this.size).subscribe(
      collection => {
        this.officers = collection.content;
        this.totalElements = collection.totalElements;
        if (this.officers.length > 0) {
          this.messageEvent.emit(this.officers[0].officeId);
        }
        this.page += 1;
      }
    );

  }

  onChangeOfficer(officer) {
    this.messageEvent.emit(officer.officeId);
  }

  onScrollDown() {
    this.officerService.findByCriteria(this.criteriaValue, this.page, this.size).subscribe(
      collection => {
        this.officers = this.officers.concat(collection.content);
        this.page += 1;
      }
    );
  }

}
