import { Component, OnInit } from '@angular/core';
import { Position } from '../../../../models/position';
import { PositionService } from '../../../../providers/position.service';

@Component({
  selector: 'app-position-info',
  templateUrl: './position-info.component.html',
  styleUrls: ['./position-info.component.scss']
})
export class PositionInfoComponent implements OnInit {

  public position: Position;


  constructor(protected positionService: PositionService) { }

  ngOnInit() {
    console.log('info init');
    this.position = new Position();
  }

  editPosition(event) {
    this.positionService.emitPosition(this.position.positionId);
    this.positionService.onOpenModal();
  }

}
