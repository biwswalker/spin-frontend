import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Position } from '../../../../models/position';
import { PositionService } from '../../../../providers/position.service';

@Component({
  selector: 'app-position-search',
  templateUrl: './position-search.component.html',
  styleUrls: ['./position-search.component.scss']
})
export class PositionSearchComponent implements OnInit {

  public positions: Position[];

  @Output() messageEvent = new EventEmitter<number>();

  public page = 1;
  public size = 20;

  public throttle = 1000;
  public scrollDistance = 1;
  protected criteriaValue: string;
  public totalElements = 0;

  constructor(protected positionService: PositionService) {
  }

  ngOnInit() {
    this.positions = [];
    this.onSearchByCriteria('');
  }


  onChangePosition(resp) {
    this.messageEvent.emit(resp.positionId);
  }

  onSearchByCriteria(criteria) {
    this.page = 1;
    this.criteriaValue = criteria;
    this.positionService.findByCriteria(criteria, this.page, this.size).subscribe(
      collection => {
        this.positions = collection.content;
        this.totalElements = collection.totalElements;
        if (collection.length > 0) {
          this.messageEvent.emit(this.positions[0].positionId);
        }
        this.page += 1;
      }
    );
  }

  onScrollDown() {
    this.positionService.findByCriteria(this.criteriaValue, this.page, this.size).subscribe(
      collection => {
        this.positions = this.positions.concat(collection.content);
        if (collection.length > 0) {
          this.messageEvent.emit(this.positions[0].positionId);
        }
        this.page += 1;
      }
    );

  }

}
