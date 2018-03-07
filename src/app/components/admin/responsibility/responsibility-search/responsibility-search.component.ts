import { ResponsibilityService } from './../../../../providers/responsibility.service';
import { Observable } from 'rxjs/Observable';
import { Responsibility } from './../../../../models/responsibility';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responsibility-search',
  templateUrl: './responsibility-search.component.html',
  styleUrls: ['./responsibility-search.component.scss']
})
export class ResponsibilitySearchComponent implements OnInit {

  public responsibilities: Observable<Responsibility[]>;

  constructor(protected responsibilityService: ResponsibilityService) {

  }

  ngOnInit() {
    this.getAllResponsibility();
  }


  getAllResponsibility() {
    this.responsibilities = this.responsibilityService.findAll();
  }

}
