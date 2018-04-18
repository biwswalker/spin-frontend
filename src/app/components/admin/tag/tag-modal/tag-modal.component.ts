import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tag } from '../../../../models/tag';
import { TagService } from '../../../../providers/tag.service';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { EventMessagesService } from '../../../../providers/utils/event-messages.service';
import { Mode } from '../../../../config/properties';

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.scss']
})
export class TagModalComponent implements OnInit {


  public tagGroup: FormGroup;
  public tag: Tag;
  public mode: string;
  public isActive: boolean = true;

  public headerTxt: string = '';

  @Output() changeState = new EventEmitter<boolean>();


  constructor(private tagService: TagService, private utilsService: UtilsService, private eventMessagesService: EventMessagesService) {
    this.tag = new Tag();

    this.tagService.key.subscribe(
      res => {
        this.getTagInfo(res);
        console.log(this.tag);
        this.mode = Mode.E;
        this.headerTxt = 'แก้ไข';
        this.validateForm();
        console.log(this.tag.tagId);

      }
    );
  }

  ngOnInit() {

    if (this.mode === Mode.E) {
      this.validateForm();
      this.mode = Mode.E;
      this.headerTxt = 'แก้ไข';
    } else {
      this.tag = new Tag();
      this.validateForm();
      this.mode = Mode.I;
      this.headerTxt = 'เพิ่ม';
    }
  }

  oncloseModal() {
    this.tagService.onCloseModal();
  }

  onSubmit() {
    this.utilsService.findInvalidControls(this.tagGroup);
    if (this.tagGroup.valid) {
      this.tagGroup.controls['activeFlag'].setValue(this.isActive ? 'A' : 'I');

      console.log('officerGroup = {}', this.tagGroup.value);
      if (this.mode === Mode.I) {
        this.tagService.createTag(this.tagGroup.value).subscribe(
          res => {
            console.log(res);
            this.changeState.emit(true);
            this.eventMessagesService.onInsertSuccess('');
          },
          error => {
            console.log(error);
            this.eventMessagesService.onInsertError(error);
          }
        );
      } else {
        console.log('mode update');
        this.tagGroup.controls['tagId'].setValue(this.tag.tagId);
        this.tagGroup.controls['versionId'].setValue(this.tag.versionId);
        this.tagService.updateTag(this.tagGroup.value).subscribe(
          res => {
            console.log(res);
            this.changeState.emit(true);
            this.eventMessagesService.onUpdateSuccess('');
          },
          error => {
            console.log(error);
            this.eventMessagesService.onUpdateError(error);
          }
        );
      }

      this.oncloseModal();
    } else {
      console.log('else {}', this.tagGroup);
    }
  }

  getTagInfo(officerId) {
    this.tagService.findByTagId(officerId).subscribe(
      res => {
        this.tag = res;
        console.log(this.tag.activeFlag);
        this.isActive = this.tag.activeFlag == 'A' ? true : false;
        console.log(this.isActive);
      }
    );
  }

  validateForm() {
    this.tagGroup = new FormGroup({
      tagId: new FormControl(this.tag.tagId),
      tagName: new FormControl(this.tag.tagName, Validators.required),
      tagType: new FormControl(this.tag.tagType),
      activeFlag: new FormControl(this.tag.activeFlag),
      versionId: new FormControl(this.tag.versionId)
    })

  }

  onChangeActiveFlag() {
    this.isActive = !this.isActive;
  }





}
