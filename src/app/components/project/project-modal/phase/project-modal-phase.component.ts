import { UtilsService } from './../../../../providers/utils/utils.service';
import { ProjectPhase } from './../../../../models/project-phase';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Format } from '../../../../config/properties';

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

  }



  validateForm(){
    this.projectPhaseGroup = new FormGroup({
      phaseName: new FormControl(this.projectPhase.phaseName, Validators.required),
      startDate: new FormControl(this.projectPhase.startDate,Validators.required),
      endDate: new FormControl(this.projectPhase.endDate,Validators.required),


    })
  }

  onAddMember(){
    console.log('start date: ',this.projectPhase.startDate);
    console.log('end date: ',this.projectPhase.endDate);
    console.log('projectPhaseGroup: ',this.projectPhaseGroup.value);
    console.log('projectPhaseGroup: ',this.projectPhaseGroup.valid);
    if(this.projectPhaseGroup.valid){

      this.projectPhase.phaseName =  this.projectPhaseGroup.value.phaseName;
      this.projectPhase.startDate = this.utilsService.convertDatePickerToThDate(this.projectPhaseGroup.value.startDate);
      this.projectPhase.endDate = this.utilsService.convertDatePickerToThDate(this.projectPhaseGroup.value.endDate);
      this.projectPhases.push(this.projectPhase);
      this.projectPhase = new ProjectPhase;

      console.log(this.projectPhase);
    }

  }


}
