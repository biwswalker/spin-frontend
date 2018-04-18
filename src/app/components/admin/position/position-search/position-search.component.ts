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

  constructor(protected positionService: PositionService) {
  }

  ngOnInit() {
    this.positions = [];
    this.getAllPosition();
  }

  getAllPosition() {
    console.log('getAllPosition');
    this.page = 1;
    this.positionService.findAllPageable(this.page, this.size).subscribe(
      collection => {
        this.positions = collection;
        this.messageEvent.emit(collection[0].positionId);

        this.page += 1;
      }
    );
  }

  onChangePosition(resp) {
    console.log(resp);
    this.messageEvent.emit(resp.positionId);
  }

  onSearchByCriteria(criteria) {
    console.log(criteria);
    this.page = 1;
    if (criteria) {
      this.criteriaValue = criteria;
      this.positionService.findByCriteria(criteria, this.page, this.size).subscribe(
        collection => {
          this.positions = collection;
          if (collection.length > 0) {
            this.messageEvent.emit(collection[0].positionId);
          }
          this.page += 1;
        }
      );
    } else {
      this.criteriaValue = '';
      this.getAllPosition();
    }
  }

  onScrollDown() {
    console.log('onScrollDown' + this.criteriaValue);
    if (this.criteriaValue) {
      this.positionService.findByCriteria(this.criteriaValue, this.page, this.size).subscribe(
        collection => {
          this.positions = this.positions.concat(collection);
          if (collection.length > 0) {
            this.messageEvent.emit(collection[0].positionId);
          }
          this.page += 1;
        }
      );
    } else {
      this.positionService.findAllPageable(this.page, this.size).subscribe(
        collection => {
          console.log(collection)
          if (collection) {
            this.page += 1;
            this.positions = this.positions.concat(collection);
          }
        }
      );
    }

  }

}
