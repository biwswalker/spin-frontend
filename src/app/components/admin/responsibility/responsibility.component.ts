import { Component, OnInit, ViewChild } from '@angular/core';
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
    this.responsibilityModal.mode = Mode.I;
    this.responsibilityModal.responsibility = new Responsibility();
    this.responsibilityService.onOpenModal();
  }





}
