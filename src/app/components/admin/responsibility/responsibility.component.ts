import { Component, OnInit, ViewChild } from '@angular/core';
import { ResponsibilityInfoComponent } from './responsibility-info/responsibility-info.component';
import { ResponsibilityService } from '../../../providers/responsibility.service';
import { ResponsibilitySearchComponent } from './responsibility-search/responsibility-search.component';
import { ResponsibilityModalComponent } from './responsibility-modal/responsibility-modal.component';

@Component({
  selector: 'app-responsibility',
  templateUrl: './responsibility.component.html',
  styleUrls: ['./responsibility.component.scss']
})
export class ResponsibilityComponent implements OnInit {


  @ViewChild(ResponsibilityInfoComponent) respinsibilityInfo;
  @ViewChild(ResponsibilitySearchComponent) respinsibilitySearch;
  @ViewChild(ResponsibilityModalComponent) responsibilityModalModel;

  protected respId: number;

  constructor(protected responsibilityService: ResponsibilityService) { }

  ngOnInit() {

  }

  getRespId(key) {
    console.log(key);
    this.respId = key;
    this.getRespInfo();
  }

  getRespInfo() {
    this.responsibilityService.findByRespId(this.respId).subscribe(
      res => {
        this.respinsibilityInfo.responsibility = res;
      }
    );
  }

  createResponsibility() {
    console.log('open');
    this.responsibilityService.onOpenModal();
  }





}
