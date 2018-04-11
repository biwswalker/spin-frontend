import { Component, OnInit } from '@angular/core';
import { TaskModalComponent } from '../task-modal.component';
import { TagService } from '../../../../../providers/tag.service';
import { Mode } from '../../../../../config/properties';
import { Task } from '../../../../../models/task';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.scss', '../task-modal.component.scss']
})
export class TaskTagComponent implements OnInit {

  public usedTagList: any[] = [];
  public tagList: any[] = [];
  public autoCompleteTagList: any[] = [];
  public mode: string;
  public task: Task = new Task();
  public tagByUserId: tagByUserId[] = [];
  private isReadonly: boolean = true;

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {

  }

  findUsedTag() {
    this.usedTagList = [];
    this.tagService.findUsedTag().subscribe(
      data => {
        // this.usedTagList = [];
        for (let obj of data) {
          this.usedTagList.push({ display: obj.tagName, value: obj.tagName });
        }
      }
    )
  }

  initialTag(task: Task, userId: string) {
    this.tagList = [];
    this.findUsedTag();
    this.initialAutocompleteTagList();
    this.findByUserId();
    if (task.taskId) {
      this.findByTaskId(task.taskId);
    }
    // if(task.ownerUserId !== userId){
    //   this.findByTaskIdNotOwner(task.taskId);
    // }
  }

  findByTaskId(id: number) {
    this.tagService.findByTaskId(id).subscribe(
      tags => {
        if (tags) {
          this.tagList = [];
          for (let tag of tags) {
            this.tagList.push({ display: tag.tag.tagName, value: tag.tag.tagName, "readonly": this.isReadonly});
          }
        }
      }
    );
  }

  // findByTaskIdNotOwner(id: number) {
  //   this.tagService.findByTaskId(id).subscribe(
  //     tags => {
  //       if (tags) {
  //         this.tagList = [];
  //         for (let tag of tags) {
  //           this.notOwnerTagList.push({ display: tag.tag.tagName, value: tag.tag.tagName });
  //         }
  //       }
  //     }
  //   );
  // }

  findByUserId() {
    this.tagByUserId = [];
    this.tagService.findByUserId().subscribe(
      listTags => {
        this.tagByUserId = listTags;
      }
    )
  }

  initialAutocompleteTagList() {
    this.autoCompleteTagList = []
    this.tagService.findAll().subscribe(
      data => {
        for (let tag of data) {
          this.autoCompleteTagList.push({ display: tag.tagName, value: tag.tagName });
        }
      }
    )
  }

  onSelected(event) {
    if (this.tagList.findIndex(tag => tag.display == event.tagName) == -1) {
      this.tagList.push({ display: event.tagName, value: event.tagName });
    }
  }
}

class tagByUserId {
  public activeFlag: string;
  public tagId: number;
  public tagName: string;
  public versionId: number;

  constructor() {
    this.activeFlag = "";
    this.tagId = null;
    this.tagName = "";
    this.versionId = null;
  }
}
