import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TagService } from '../../../../../providers/tag.service';

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
  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.tagList = [];
    this.findUsedTag();
    this.initialAutocompleteTagList();
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

  initialAutocompleteTagList(){
    this.tagService.findAll().subscribe(
      data=>{
        console.log('tagList: ', data);
        this.autoCompleteTagList = data;
      }
    )
  }

  onSelected(event) {
    this.tagList.push(event);
  }
}
