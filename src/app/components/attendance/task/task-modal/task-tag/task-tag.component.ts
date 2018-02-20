import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.scss']
})
export class TaskTagComponent implements OnInit {

  tagList:any[] = [];
  autoCompleteTagList: any[] = [];
  constructor() { }

  ngOnInit() {
    this.autoCompleteTagList = ['pizza', 'pig', 'hamburger', 'ham'];
  }

}
