import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.scss']
})
export class TaskTagComponent implements OnInit {

  usedTagList:any[] = [];
  tagList: any[] = [];
  autoCompleteTagList: any[] = [];
  constructor() { }

  ngOnInit() {
    this.autoCompleteTagList = ['pizza', 'pig', 'hamburger', 'ham'];
    this.usedTagList = ['pizza', 'pig', 'hamburger', 'ham'];
  }

  onSelected(event){
    console.log(event)
    this.tagList.push(event);
  }
}
