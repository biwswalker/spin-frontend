import { Responsibility } from './../../../../models/responsibility';
import { Component, OnInit } from '@angular/core';
import { ResponsibilityService } from '../../../../providers/responsibility.service';

@Component({
  selector: 'app-responsibility-info',
  templateUrl: './responsibility-info.component.html',
  styleUrls: ['./responsibility-info.component.scss']
})
export class ResponsibilityInfoComponent implements OnInit {

  public responsibility: Responsibility;

  constructor(protected responsibilityService: ResponsibilityService) { }

  ngOnInit() {
    this.responsibility = new Responsibility();
    this.findByRespId(1);
  }

  findByRespId(key) {
    this.responsibilityService.findByRespId(key).subscribe(
      data => {
        console.log(data);
        this.responsibility = data;
      }
    );
  }

}
