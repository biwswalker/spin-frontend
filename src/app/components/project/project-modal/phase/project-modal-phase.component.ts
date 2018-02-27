import { UtilsService } from './../../../../providers/utils/utils.service';
import { ProjectPhase } from './../../../../models/project-phase';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Format } from '../../../../config/properties';
declare var $: any;
@Component({
  selector: 'project-modal-phase',
  styleUrls: ['./project-modal-phase.component.scss'],
  templateUrl: './project-modal-phase.component.html'
})
export class ProjectModalPhaseComponent implements OnInit {
  public projectPhaseGroup: FormGroup;
  public projectPhase: ProjectPhase = new ProjectPhase;
  public projectPhases: ProjectPhase[] = [];
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.projectPhase = new ProjectPhase;
    this.projectPhases = [];
    this.validateForm();
    let self = this;
    $('#start-date').datepicker({ dateFormat: Format.DATE_PIK, isBE: true, onSelect: (date) => self.onSelectCallBack(1,date) });
    $('#end-date').datepicker({ dateFormat: Format.DATE_PIK, isBE: true, onSelect: (date) => self.onSelectCallBack(2,date) });
  }

  onSelectCallBack(pos:number,date: string) {
    console.log(date)
    if(pos == 1){
      this.projectPhase.startDate = date;
    }
    if(pos == 2){
      this.projectPhase.endDate = date;
    }

  }

  validateForm(){
    this.projectPhaseGroup = new FormGroup({
      phaseName: new FormControl(this.projectPhase.phaseName, Validators.required),
      startDate: new FormControl(this.projectPhase.startDate, Validators.required),
      endDate: new FormControl(this.projectPhase.endDate, Validators.required),

    })
  }

  onAddMember(){
    this.projectPhase.startDate = this.utilsService.convertDatePickerToThDate(this.projectPhase.startDate);
    this.projectPhase.endDate = this.utilsService.convertDatePickerToThDate(this.projectPhase.endDate);
    this.projectPhases.push(this.projectPhase);
    this.projectPhase = new ProjectPhase;
  }

}
