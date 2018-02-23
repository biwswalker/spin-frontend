import { ProjectPhase } from './../../../../models/project-phase';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'project-modal-phase',
  styleUrls: ['./project-modal-phase.component.scss'],
  templateUrl: './project-modal-phase.component.html'
})
export class ProjectModalPhaseComponent implements OnInit {
  public projectPhaseGroup: FormGroup;
  public projectPhase: ProjectPhase = new ProjectPhase;
  public projectPhases: ProjectPhase[] = [];
  constructor() { }

  ngOnInit() {
    this.projectPhase = new ProjectPhase;
    this.projectPhases = [];
    this.validateForm();
  }

  validateForm(){
    this.projectPhaseGroup = new FormGroup({
      phaseName: new FormControl(this.projectPhase.phaseName, Validators.required),
      startDate: new FormControl(this.projectPhase.startDate, Validators.required),
      endDate: new FormControl(this.projectPhase.endDate, Validators.required),

    })
  }

  onAddMember(){
    this.projectPhases.push(this.projectPhase);
    this.projectPhase = new ProjectPhase;
  }

}
