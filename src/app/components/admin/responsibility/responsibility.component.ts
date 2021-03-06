import { Component, OnInit, ViewChild, DoCheck, OnDestroy, AfterViewChecked, AfterContentInit } from '@angular/core';
import { ResponsibilityInfoComponent } from './responsibility-info/responsibility-info.component';
import { ResponsibilityService } from '../../../providers/responsibility.service';
import { ResponsibilitySearchComponent } from './responsibility-search/responsibility-search.component';
import { ResponsibilityModalComponent } from './responsibility-modal/responsibility-modal.component';
import { Responsibility } from '../../../models/responsibility';
import { Mode } from '../../../config/properties';

@Component({
  selector: 'app-responsibility',
  templateUrl: './responsibility.component.html',
  styleUrls: ['./responsibility.component.scss']
})
export class ResponsibilityComponent implements OnInit {


  @ViewChild(ResponsibilityInfoComponent) respinsibilityInfo;
  @ViewChild(ResponsibilitySearchComponent) respinsibilitySearch;
  @ViewChild(ResponsibilityModalComponent) responsibilityModal;

  protected respId: number;

  constructor(protected responsibilityService: ResponsibilityService) { }

  ngOnInit() {
  }


  getData(key) {
    console.log('key = ' + key);
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
    this.responsibilityModal.mode = Mode.I;
    this.responsibilityModal.responsibility = new Responsibility();
    this.responsibilityModal.ngOnInit();
    this.responsibilityService.onOpenModal();
  }

  onCheckState(key) {
    console.log('onCheckState = ' + key);
    if (key) {
      this.respinsibilitySearch.ngOnInit();
    }
  }



}
