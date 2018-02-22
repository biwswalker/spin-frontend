import { Component, OnInit } from '@angular/core';
declare var SpinModal: any;

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let modal = new SpinModal();
  }

}
