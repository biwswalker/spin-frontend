import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Position } from '../../../../models/position';
import { PositionService } from '../../../../providers/position.service';
import { UtilsService } from '../../../../providers/utils/utils.service';
import { Mode } from '../../../../config/properties';
import { EventMessagesService } from '../../../../providers/utils/event-messages.service';

@Component({
  selector: 'app-position-modal',
  templateUrl: './position-modal.component.html',
  styleUrls: ['./position-modal.component.scss']
})
export class PositionModalComponent implements OnInit {

  public positionGroup: FormGroup;
  public position: Position;
  public mode: string;
  public isActive: boolean = true;

  public headerTxt: string = '';
  @Output() changeState = new EventEmitter<boolean>();

  constructor(protected positionService: PositionService, private utilsService: UtilsService, protected eventMessagesService: EventMessagesService) {
    this.position = new Position();

    this.positionService.key.subscribe(
      res => {
        this.getPositionInfo(res);
        console.log(this.position);
        this.mode = Mode.E;
        this.headerTxt = 'แก้ไข';
        this.validateForm();
        console.log(this.position.positionId);

      }
    );
  }

  ngOnInit() {
    if (this.mode === Mode.E) {
      this.validateForm();
      this.mode = Mode.E;
      this.headerTxt = 'แก้ไข';
    } else {
      this.position = new Position();
      this.validateForm();
      this.mode = Mode.I;
      this.headerTxt = 'เพิ่ม';
    }
  }

  getPositionInfo(positionId) {
    this.positionService.findByPositionId(positionId).subscribe(
      res => {
        this.position = res;
        this.isActive = this.position.activeFlag == 'A' ? true : false;
      }
    );
  }


  validateForm() {
    this.positionGroup = new FormGroup({
      positionName: new FormControl(this.position.positionName, Validators.required),
      positionAbbr: new FormControl(this.position.positionAbbr, Validators.required),
      remark: new FormControl(this.position.remark),
      activeFlag: new FormControl(this.position.activeFlag),
      positionId: new FormControl(this.position.positionId),
      versionId: new FormControl(this.position.versionId)
    })
  }

  oncloseModal() {
    this.positionService.onCloseModal();
  }

  onSubmit() {
    this.utilsService.findInvalidControls(this.positionGroup);
    if (this.positionGroup.valid) {
      this.positionGroup.controls['activeFlag'].setValue(this.isActive ? 'A' : 'I');
      console.log('responsibilityGroup = {}', this.positionGroup.value);
      if (this.mode === Mode.I) {
        this.positionService.createPosition(this.positionGroup.value).subscribe(
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
        this.positionGroup.controls['positionId'].setValue(this.position.positionId);
        this.positionGroup.controls['versionId'].setValue(this.position.versionId);
        this.positionService.updatePosition(this.positionGroup.value).subscribe(
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
      console.log('else {}', this.positionGroup);
    }

  }

  onChangeActiveFlag() {
    this.isActive = !this.isActive;
  }


}
