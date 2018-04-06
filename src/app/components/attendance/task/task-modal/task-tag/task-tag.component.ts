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

  initialTag(taskId: number) {
    this.tagList = [];
    this.findUsedTag();
    this.initialAutocompleteTagList();
    this.findByUserId();
    if (taskId) {
      this.findByTaskId(taskId);
    }
  }

  findByTaskId(id: number) {
    // this.tagList = [];
    this.tagService.findByTaskId(id).subscribe(
      tags => {
        if (tags) {
          this.tagList = [];
          for (let tag of tags) {
            this.tagList.push({ display: tag.tag.tagName, value: tag.tag.tagName });
          }
        }
      }
    );
  }

  findByUserId() {
    this.tagByUserId = [];
    this.tagService.findByUserId().subscribe(
      listTags => {
        console.log(listTags)
        this.tagByUserId = listTags;
        // this.tagByUserId.push({activeFlag: null, tagId: 99, tagName: "TEST", versionId: 99});
      }
    )
  }

  initialAutocompleteTagList() {
    this.autoCompleteTagList = []
    this.tagService.findAll().subscribe(
      data => {
        // this.autoCompleteTagList = []
        this.autoCompleteTagList = data;
      }
    )
  }

  onSelected(event) {
    // console.log(event)
    if (this.tagList.indexOf(event) == -1) {
      this.tagList.push(event.tagName);
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
