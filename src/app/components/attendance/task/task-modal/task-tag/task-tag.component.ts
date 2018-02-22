import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.scss']
})
export class TaskTagComponent implements OnInit {

  usedTagList: any[] = [];
  tagList: any[] = [];
  autoCompleteTagList: any[] = [];
  constructor(
    private taskModal: TaskModalComponent
  ) { }

  ngOnInit() {
    this.autoCompleteTagList = ['pizza', 'pig', 'hamburger', 'ham'];
    this.usedTagList = ['pizza', 'pig', 'hamburger', 'ham'];
  }

  onSelected(event) {
    console.log(event)
    this.tagList.push(event);
  }

  addTag(event) {
    console.log(event)
    this.taskModal.taskForm.taskTag = [];
    this.taskModal.taskForm.taskTag['tagId'] = this.tagList;
  }
}
