import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from '../../../providers/utils/utils.service';
import { ProjectService } from '../../../providers/project.service';
import { TaskService } from '../../../providers/task.service';
import { ReportService } from '../../../providers/report.service';

@Component({
  selector: 'app-project-tag-report',
  templateUrl: './project-tag-report.component.html',
  styleUrls: ['./project-tag-report.component.scss']
})
export class ProjectTagReportComponent implements OnInit {

  // Criteria
  public startDate = '';
  public endDate = '';
  public project: any;

  // Project Atcp List 
  public projectList: Project[] = [];

  //  Form
  public projectTagGroup: FormGroup;

  // Preview List
  public projectTagList: any[] = [];

  constructor(private utilsService: UtilsService, private projectService: ProjectService, private reportService: ReportService) {
  }

  ngOnInit() {
    this.resetFormGroup();
    this.projectService.fetchProjectAutocomplete().subscribe(projects => {
      this.projectList = projects;
    });
  }


  resetFormGroup() {
    this.project = null;
    this.startDate = this.utilsService.displayCalendarDate(this.utilsService.getCurrentThDate());
    this.endDate = this.utilsService.displayCalendarDate(this.utilsService.getCurrentThDate());
    this.projectTagGroup = new FormGroup({
      project: new FormControl(this.project, Validators.required),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required)
    });
  }

  reported() {
    this.reportService.openReport();
  }

  async preview() {
    this.utilsService.findInvalidControls(this.projectTagGroup);
    if (this.projectTagGroup.valid) {
      let startDateStr = this.utilsService.convertDatePickerToThDate(this.startDate);
      let endDateStr = this.utilsService.convertDatePickerToThDate(this.endDate);
      this.projectTagList = await this.projectService.projectTagReport(this.project, startDateStr, endDateStr);
      console.log(this.projectTagList)
    }
  }

}