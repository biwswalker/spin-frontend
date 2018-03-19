import { Observable } from 'rxjs/Observable';
import { Responsibility } from './../../../../models/responsibility';
import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ResponsibilityService } from '../../../../providers/responsibility.service';
import { ResponsibilityModalComponent } from '../responsibility-modal/responsibility-modal.component';

@Component({
  selector: 'app-responsibility-info',
  templateUrl: './responsibility-info.component.html',
  styleUrls: ['./responsibility-info.component.scss']
})
export class ResponsibilityInfoComponent implements OnInit {

  public responsibility: Responsibility;


  constructor(protected responsibilityService: ResponsibilityService) { }

  ngOnInit() {
    console.log('info init');
    this.responsibility = new Responsibility();
  }


  editResponsibility(event) {
    this.responsibilityService.emitResponsibility(this.responsibility.respId);
    this.responsibilityService.onOpenModal();
  }

}
