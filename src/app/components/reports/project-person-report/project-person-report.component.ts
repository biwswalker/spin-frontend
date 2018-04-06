import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Project } from '../../../models/project';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../providers/authentication.service';
import { UtilsService } from '../../../providers/utils/utils.service';
import { ProjectService } from '../../../providers/project.service';
import { ReportService } from '../../../providers/report.service';

@Component({
  selector: 'app-project-person-report',
  templateUrl: './project-person-report.component.html',
  styleUrls: ['./project-person-report.component.scss']
})
export class ProjectPersonReportComponent implements OnInit {

  // Criteria
  public startDate = '';
  public endDate = '';
  public project: any;
  public user: User;

  // Project Atcp List 
  public projectList: Project[] = [];

  //  Form
  public projectPersonGroup: FormGroup;

  // Preview List
  public projectPersonList: ProjectPersonForm[] = [];
  public totalHrSum = 0;
  public totalMinSum = 0;

  constructor(private auth: AuthenticationService, private utilsService: UtilsService, private projectService: ProjectService, private reportService: ReportService
  ) {
  }

  async ngOnInit() {
    this.resetFormGroup();
    await this.auth.crrUser.subscribe(user => this.user = user);
    this.projectList = await this.projectService.fetchProjectAutocomplete().toPromise();
  }


  resetFormGroup() {
    this.projectPersonList = [];
    this.totalHrSum = 0;
    this.totalMinSum = 0;
    
    this.project = null;
    this.startDate = this.utilsService.displayCalendarDate(this.utilsService.getCurrentThDate());
    this.endDate = this.utilsService.displayCalendarDate(this.utilsService.getCurrentThDate());
    this.projectPersonGroup = new FormGroup({
      project: new FormControl(this.project, Validators.required),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required)
    });
  }

  reported() {
    this.reportService.openReport();
  }

  async preview() {
    this.utilsService.findInvalidControls(this.projectPersonGroup);
    if (this.projectPersonGroup.valid) {
      this.utilsService.loader(true);
      this.totalHrSum = 0;
      this.totalMinSum = 0;
      let startDateStr = this.utilsService.convertDatePickerToThDate(this.startDate);
      let endDateStr = this.utilsService.convertDatePickerToThDate(this.endDate);
      this.projectPersonList = await this.projectService.projectTagReport(this.project, startDateStr, endDateStr).map(async (callback: ProjectPersonForm[]) => {
        for (let projectTag of callback) {
          let totalHr = 0;
          let totalMin = 0;
          for (let usr of projectTag.users) {
            let hr = usr.sumAsHour;
            let min = usr.sumAsMin;
            totalHr += hr;
            totalMin += min;
          }
          projectTag.totalHr = totalHr;
          projectTag.totalMin = totalMin;
          if (totalMin > 59) {
            let tMin: number = totalMin / 60;
            let splited = tMin.toString().split('.');
            let hr = Number(splited[0]);
            projectTag.totalHr += hr;
            if (splited[1]) {
              let min = Number(`0.${splited[1]}`) * 60;
              projectTag.totalMin = min;
            } else {
              projectTag.totalMin = 0;
            }
          }
          this.totalHrSum += totalHr;
          this.totalMinSum += totalMin;
          if (this.totalMinSum > 59) {
            let tMin: number = this.totalMinSum / 60;
            let splited = tMin.toString().split('.');
            let hr = Number(splited[0]);
            this.totalHrSum += hr;
            if (splited[1]) {
              let min = Number(`0.${splited[1]}`) * 60;
              this.totalMinSum = min;
            } else {
              this.totalMinSum = 0;
            }
          }
        }
        return callback;
      }).toPromise();
      if (this.projectPersonList) {
        this.utilsService.loader(false);
      }
    }
  }

}

class ProjectPersonForm {
  public tagName: string;
  public users: any[];
  public totalMin: number;
  public totalHr: number;

  constructor() {
    this.tagName = '';
    this.users = [];
    this.totalMin = null;
    this.totalHr = null;
  }
}