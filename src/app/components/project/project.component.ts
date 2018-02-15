import { Component, OnInit } from '@angular/core';
declare var SpinModal: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let modal = new SpinModal();
    modal.initial('#project-modal', { show: true, backdrop: 'static', keyboard: true })
  }

}
