import { ResponsibilityService } from './../../../../providers/responsibility.service';
import { Observable } from 'rxjs/Observable';
import { Responsibility } from './../../../../models/responsibility';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-responsibility-search',
  templateUrl: './responsibility-search.component.html',
  styleUrls: ['./responsibility-search.component.scss']
})
export class ResponsibilitySearchComponent implements OnInit {

  public responsibilities: Observable<Responsibility[]>;

  @Output() respId = new EventEmitter<number>();


  protected size: number = 0;

  constructor(protected responsibilityService: ResponsibilityService) {

  }

  ngOnInit() {
    this.getAllResponsibility();
  }


  getAllResponsibility() {
    this.responsibilities = this.responsibilityService.findAll().do(
      collection => {
        this.size = collection.length;
        console.log(collection[0]);
        this.respId.emit(collection[0].respId);
      }
    );
  }

  onChangeResp(resp) {
    console.log(resp);
    this.respId.emit(resp.respId);
  }

  onSearchByCriteria(key) {
    console.log(key);
    this.responsibilities = this.responsibilityService.findByCriteria(key).do(
      collection => {
        console.log(collection);
        this.size = collection.length;
        if(collection.length > 0){
          this.respId.emit(collection[0].respId);
        }
      }
    );
  }


}
