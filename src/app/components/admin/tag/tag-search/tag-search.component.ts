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
  public size = 15;

  public throttle = 1000;
  public scrollDistance = 1;
  protected criteriaValue: string;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tags = [];
    if (this.criteriaValue) {
      this.onSearchByCriteria(this.criteriaValue);
    } else {
      this.getAllTag();
    }
  }

  getAllTag() {
    console.log('getAllTag');
    this.page = 1;
    this.tagService.findAllPageable(this.page, this.size).subscribe(
      collection => {
        console.log('collection ', collection);
        this.tags = collection;
        console.log('collection[0].tagId ', collection[0].tagId);
        this.messageEvent.emit(collection[0].tagId);
        this.page += 1;
        console.log('end');
      }
    );
  }


  onSearchByCriteria(criteria) {
    console.log('criteria ', criteria);
    this.page = 1;
    if (criteria) {
      this.criteriaValue = criteria;
      this.tagService.findByCriteria(criteria, this.page, this.size).subscribe(
        collection => {
          this.tags = collection;
          if (collection.length > 0) {
            this.messageEvent.emit(collection[0].tagId);
          }
          this.page += 1;
        }
      );
    } else {
      this.criteriaValue = '';
      this.getAllTag();
    }
  }

  onChangeTag(tag) {
    console.log(tag);
    this.messageEvent.emit(tag.tagId);
  }

  onScrollDown() {
    console.log('onScrollDown' + this.criteriaValue);
    if (this.criteriaValue) {
      this.tagService.findByCriteria(this.criteriaValue, this.page, this.size).subscribe(
        collection => {
          this.tags = this.tags.concat(collection);

          this.page += 1;
        }
      );
    } else {
      this.tagService.findAllPageable(this.page, this.size).subscribe(
        collection => {
          if (collection) {
            this.page += 1;
            this.tags = this.tags.concat(collection);
          }
        }
      );
    }

  }

}
