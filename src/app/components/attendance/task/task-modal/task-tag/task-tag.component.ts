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
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.findUsedTag();
  }

  findUsedTag(){
    this.tagService.findUsedTag().subscribe(
      data=>{
        for(let obj of data){
          this.usedTagList.push({display: obj.tagName, value: obj.tagName});
        }
      }
    )
  }

  onSelected(event) {
    this.tagList.push(event);
  }
}
