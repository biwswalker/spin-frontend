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
    public taskModal: TaskModalComponent,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.findUsedTag();
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
    this.taskModal.taskForm.task.taskTagList = [];
    console.log(Object.values(this.taskModal.taskForm.taskTag))
  }
}
