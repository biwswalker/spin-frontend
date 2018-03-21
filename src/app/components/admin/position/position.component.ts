import { Component, OnInit, ViewChild } from '@angular/core';
import { PositionSearchComponent } from './position-search/position-search.component';
import { PositionModalComponent } from './position-modal/position-modal.component';
import { PositionInfoComponent } from './position-info/position-info.component';
import { PositionService } from '../../../providers/position.service';
import { Mode } from '../../../config/properties';
import { Position } from '../../../models/position';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {



  @ViewChild(PositionInfoComponent) positionInfo;
  @ViewChild(PositionSearchComponent) positionSearch;
  @ViewChild(PositionModalComponent) positionModal;

  protected positionId: number;

  constructor(protected positionService: PositionService) { }

  ngOnInit() {
  }


  getData(key) {
    console.log('key = ' + key);
    this.positionId = key;
    this.getPositionInfo();
  }

  getPositionInfo() {
    this.positionService.findByPositionId(this.positionId).subscribe(
      res => {
        this.positionInfo.position = res;
      }
    );
  }

  createResponsibility() {
    this.positionModal.mode = Mode.I;
    this.positionModal.position = new Position();
    this.positionModal.ngOnInit();
    this.positionService.onOpenModal();
  }

  onCheckState(key) {
    console.log('onCheckState = ' + key);
    if (key) {
      this.positionSearch.ngOnInit();
    }
  }

}
