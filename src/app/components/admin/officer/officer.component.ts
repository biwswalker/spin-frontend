import { OfficerService } from './../../../providers/officer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OfficerInfoComponent } from './officer-info/officer-info.component';
import { OfficerSearchComponent } from './officer-search/officer-search.component';
import { OfficerModalComponent } from './officer-modal/officer-modal.component';

@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.scss']
})
export class OfficerComponent implements OnInit {



  @ViewChild(OfficerInfoComponent) officerInfo;
  @ViewChild(OfficerSearchComponent) officerSearch;
  @ViewChild(OfficerModalComponent) officerModal;

  protected officeId: string;




  constructor(protected officerService: OfficerService) { }

  ngOnInit() {
  }

  getData(key) {
    console.log('key = ' + key);
    this.officeId = key;
    this.getOfficerInfo();
  }

  getOfficerInfo() {
    console.log('this.officerId = ' + this.officeId);
    this.officerService.findByOfficeId(this.officeId).subscribe(
      res => {
        this.officerInfo.officer = res;
      }
    );
  }

}
