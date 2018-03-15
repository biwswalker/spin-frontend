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

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.tagList = [];
    this.findUsedTag();
    this.initialAutocompleteTagList();
  }

  findUsedTag() {
    this.tagService.findUsedTag().subscribe(
      data => {
        for (let obj of data) {
          this.usedTagList.push({ display: obj.tagName, value: obj.tagName });
        }
      }
    )
  }

  initialTag(taskId: number) {
    if (taskId) {
      this.tagService.findByTaskId(taskId).subscribe(
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
  }


  initialAutocompleteTagList() {
    this.tagService.findAll().subscribe(
      data => {
        this.autoCompleteTagList = data;
      }
    )
  }

  onSelected(event) {
    if (this.tagList.indexOf(event) == -1) {
      this.tagList.push(event);
    }
  }
}
