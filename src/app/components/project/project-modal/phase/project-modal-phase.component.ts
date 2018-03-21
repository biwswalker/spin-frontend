import { UtilsService } from './../../../../providers/utils/utils.service';
import { ProjectPhase } from './../../../../models/project-phase';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Format } from '../../../../config/properties';
import { ProjectService } from '../../../../providers/project.service';

@Component({
  selector: 'project-modal-phase',
  styleUrls: ['./project-modal-phase.component.scss'],
  templateUrl: './project-modal-phase.component.html'
})
export class ProjectModalPhaseComponent implements OnInit {
  public projectPhaseGroup: FormGroup;
  public projectPhase: ProjectPhase = new ProjectPhase;
  public projectPhases: ProjectPhase[] = [];
  constructor(private utilsService: UtilsService,
              private projectService:ProjectService) { }

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

  onDeletePhase(index){
    this.projectPhases.splice(index, 1);
  }


  onAddPhase(){
    this.utilsService.findInvalidControls(this.projectPhaseGroup);
    if(this.projectPhaseGroup.valid){

      this.projectPhase.phaseName =  this.projectPhaseGroup.value.phaseName;
      this.projectPhase.startDate = this.utilsService.convertDatePickerToThDate(this.projectPhaseGroup.value.startDate);
      this.projectPhase.endDate = this.utilsService.convertDatePickerToThDate(this.projectPhaseGroup.value.endDate);
      this.projectPhases.push(this.projectPhase);
      this.projectPhase = new ProjectPhase;
      this.projectPhaseGroup.reset();
    }

  }

  prepareDataForEdit(projectId){
    this.projectService.findProjectPhaseById(projectId).subscribe(
      data=>{
        this.projectPhases = data;
      }
    )
  }


}
