import { Component, OnInit } from '@angular/core';
declare var SpinModal: any;

@Component({
  selector: 'tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let modal = new SpinModal();
    // modal.initial('#task-modal', { show: true, backdrop: 'static', keyboard: true })
  }

}
