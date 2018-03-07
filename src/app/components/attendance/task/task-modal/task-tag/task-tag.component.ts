import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TagService } from '../../../../../providers/tag.service';
import { Mode } from '../../../../../config/properties';
import { Task } from '../../../../../models/task';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.scss']
})
export class TaskTagComponent implements OnInit {

  public usedTagList: any[] = [];
  public tagList: any[] = [];
  public autoCompleteTagList: any[] = [];
  public mode: string;
  public task: Task = new Task();

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.tagList = [];
    this.findUsedTag();
    this.initialAutocompleteTagList();
    if(this.mode == Mode.E){
      console.log('tag mode: ' + this.mode);
      this.findTagByTaskId(this.task.taskId);
    }
  }

  findUsedTag(){
    console.log('findusedtag');
    this.tagService.findUsedTag().subscribe(
      data=>{
        for(let obj of data){
          this.usedTagList.push({display: obj.tagName, value: obj.tagName});
        }
      }
    )
  }

  findTagByTaskId(taskId: number){
    console.log('findTagByTaskId');
    this.tagService.findByTaskId(taskId).subscribe(
      tag=>{
        console.log(tag);
      }
    )
  }


  initialAutocompleteTagList(){
    console.log('initialAutocompleteTagList');
    this.tagService.findAll().subscribe(
      data=>{
        this.autoCompleteTagList = data;
      }
    )
  }

  onSelected(event) {
    this.tagList.push(event);
  }
}
