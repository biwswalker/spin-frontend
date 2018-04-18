import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tag } from '../../../../models/tag';
import { TagService } from '../../../../providers/tag.service';

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.scss']
})
export class TagSearchComponent implements OnInit {

  public tags: Tag[];

  public page = 1;
  public size = 20;

  public throttle = 1000;
  public scrollDistance = 1;
  protected criteriaValue: string;
  public totalElements = 0;

  @Output() messageEvent = new EventEmitter<number>();

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tags = [];
    this.onSearchByCriteria('');

  }


  onSearchByCriteria(criteria) {
    this.page = 1;
    this.criteriaValue = criteria;
    this.tagService.findByCriteria(criteria, this.page, this.size).subscribe(
      collection => {
        this.tags = collection.content;
        this.totalElements = collection.totalElements;
        if (collection.length > 0) {
          this.messageEvent.emit(this.tags[0].tagId);
        }
        this.page += 1;
      }
    );
  }

  onChangeTag(tag) {
    this.messageEvent.emit(tag.tagId);
  }

  onScrollDown() {
    this.tagService.findByCriteria(this.criteriaValue, this.page, this.size).subscribe(
      collection => {
        this.tags = this.tags.concat(collection.content);

        this.page += 1;
      }
    );

  }

}
