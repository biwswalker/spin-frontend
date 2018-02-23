import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TagService } from '../../../../../providers/tag.service';

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
    private taskModal: TaskModalComponent,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.autoCompleteTagList = ['pizza', 'pig', 'hamburger', 'ham'];
    this.findUsedTag();
    // this.usedTagList = ['pizza', 'pig', 'hamburger', 'ham'];
  }

  findUsedTag(){
    this.tagService.findUsedTag().subscribe(
      data=>{
        console.log(data)
        this.usedTagList = data
      }
    )
  }

  onSelected(event) {
    this.tagList.push(event);
  }

  addTag(event) {
    this.taskModal.taskForm.taskTag = [];
    this.taskModal.taskForm.taskTag['tagId'] = this.tagList;
  }
}
