import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { ProjectService } from '../../../providers/project.service';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../../models/project';
import { UtilsService } from '../../../providers/utils/utils.service';
import { TaskService } from '../../../providers/task.service';
import { ReportService } from '../../../providers/report.service';

@Component({
  selector: 'unstamped-report',
  templateUrl: './unstamped-report.component.html',
  styleUrls: ['./unstamped-report.component.scss']
})
export class UnstampedReportComponent implements OnInit {

  // Criteria
  public startDate = '';
  public endDate = '';
  public project: any;

  // Project Atcp List 
  public projectList: Project[] = [];

  //  Form
  public unstampedReportGroup: FormGroup;

  // Preview List
  public unstampedList = new Observable<any[]>();

  constructor(private utilsService: UtilsService, private projectService: ProjectService, private taskService: TaskService, private reportService: ReportService) {
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
    this.unstampedReportGroup = new FormGroup({
      project: new FormControl(this.project, Validators.required),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required)
    });
  }

  reported() {
    this.reportService.openReport();
  }

  preview() {
    this.utilsService.findInvalidControls(this.unstampedReportGroup);
    if (this.unstampedReportGroup.valid) {
      this.unstampedList = this.taskService.unstampedReport(this.project, this.startDate, this.endDate);
    }
  }
}
