import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from '../../../../models/project';

@Component({
  selector: 'project-modal-detail',
  styleUrls: ['./project-modal-detail.component.scss'],
  templateUrl: './project-modal-detail.component.html',
})
export class ProjectModalDetailComponent implements OnInit {

  public projectDetailGroup: FormGroup;
  public project: Project = new Project();

  constructor() { }

  ngOnInit() {
    this.projectDetailGroup = new FormGroup({
      projectAbbr: new FormControl(this.project.projectAbbr, Validators.required),
      projectName: new FormControl(this.project.projectName, Validators.required),
      customerName: new FormControl(this.project.customerName, Validators.required),
      projectDetail: new FormControl(this.project.detail),
      hardware: new FormControl(this.project.hardware),
      software: new FormControl(this.project.software),
      visibilityFlag: new FormControl((this.project.visibilityFlag == 'A' ? true : false))
    })
  }

}
