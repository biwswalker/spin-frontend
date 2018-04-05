import { Component, OnInit, ViewChild } from '@angular/core';
import { TagInfoComponent } from './tag-info/tag-info.component';
import { TagSearchComponent } from './tag-search/tag-search.component';
import { TagModalComponent } from './tag-modal/tag-modal.component';
import { TagService } from '../../../providers/tag.service';
import { EventMessagesService } from '../../../providers/utils/event-messages.service';
import { Mode } from '../../../config/properties';
import { Tag } from '../../../models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @ViewChild(TagInfoComponent) tagInfo;
  @ViewChild(TagSearchComponent) tagSearch;
  @ViewChild(TagModalComponent) tagModal;

  public tagId: string;

  constructor(private tagService: TagService, private eventMessagesService: EventMessagesService) { }

  ngOnInit() {
  }

  getData(key) {
    console.log('key = ' + key);
    this.tagId = key;
    this.getTagInfo();
  }

  getTagInfo() {
    console.log('this.tagId = ' + this.tagId);
    this.tagService.findByTagId(this.tagId).subscribe(
      res => {
        this.tagInfo.tag = res;
      }
    );
  }

  createTag() {
    this.tagModal.mode = Mode.I;
    this.tagModal.tag = new Tag();
    this.tagModal.ngOnInit();
    this.tagService.onOpenModal();
  }

  onCheckState(key) {
    console.log('onCheckState = ' + key);
    if (key) {
      this.tagSearch.ngOnInit();
    }
  }
}
