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
    this.validateForm();

  }

  validateForm(){
    this.projectPhaseGroup = new FormGroup({
      phase_name: new FormControl(this.projectPhase.phase_name, Validators.required),
      start_date: new FormControl(this.projectPhase.start_date, Validators.required),
      end_date: new FormControl(this.projectPhase.end_date, Validators.required),

    })
  }

  onAddMember(){
    this.projectPhases.push(this.projectPhaseGroup.value);
    this.projectPhase = new ProjectPhase;
  }

}
