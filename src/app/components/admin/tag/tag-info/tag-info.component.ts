import { Component, OnInit } from '@angular/core';
import { TagService } from '../../../../providers/tag.service';
import { Tag } from '../../../../models/tag';

@Component({
  selector: 'app-tag-info',
  templateUrl: './tag-info.component.html',
  styleUrls: ['./tag-info.component.scss']
})
export class TagInfoComponent implements OnInit {

  public tag: Tag;
  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tag = new Tag();
  }

  editTag(event) {
    this.tagService.emitTag(this.tag.tagId);
    this.tagService.onOpenModal();
  }

}
