import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { ProjectService } from '../../../providers/project.service';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../../models/project';
import { UtilsService } from '../../../providers/utils/utils.service';
import { TaskService } from '../../../providers/task.service';
import { ReportService } from '../../../providers/report.service';
import { resolve } from 'q';
import { AuthenticationService } from '../../../providers/authentication.service';

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
  public user: User;

  // Project Atcp List 
  public projectList: Project[] = [];

  //  Form
  public unstampedReportGroup: FormGroup;

  // Preview List
  public unstampedList: any[] = [];

  constructor(private auth: AuthenticationService, private utilsService: UtilsService, private projectService: ProjectService, private taskService: TaskService, private reportService: ReportService) {
  }

  async ngOnInit() {
    this.auth.crrUser.subscribe(user => this.user = user);
    this.resetFormGroup();
    this.projectList = await this.projectService.fetchProjectAutocomplete().toPromise();
  }


  resetFormGroup() {
    this.unstampedList = [];
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

  async preview() {
    this.utilsService.findInvalidControls(this.unstampedReportGroup);
    if (this.unstampedReportGroup.valid) {
      this.utilsService.loader(true);
      let startDateStr = this.utilsService.convertDatePickerToThDate(this.startDate);
      let endDateStr = this.utilsService.convertDatePickerToThDate(this.endDate);
      this.unstampedList = await this.taskService.unstampedReport(this.project, startDateStr, endDateStr);
      if (this.unstampedList) {
        this.utilsService.loader(false);
      }
    }
  }
}