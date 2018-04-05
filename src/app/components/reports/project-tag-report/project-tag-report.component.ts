import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from '../../../providers/utils/utils.service';
import { ProjectService } from '../../../providers/project.service';
import { TaskService } from '../../../providers/task.service';
import { ReportService } from '../../../providers/report.service';
import { OfficerService } from '../../../providers/officer.service';
import { AuthenticationService } from '../../../providers/authentication.service';
import { User } from '../../../models/user';

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
  public user: User;

  // Project Atcp List 
  public projectList: Project[] = [];

  //  Form
  public projectTagGroup: FormGroup;

  // Preview List
  public projectTagList: ProjectTagForm[] = [];
  public totalHrSum = 0;
  public totalMinSum = 0;

  constructor(private auth: AuthenticationService, private utilsService: UtilsService, private projectService: ProjectService, private reportService: ReportService
    , private officerService: OfficerService
  ) {
  }

  async ngOnInit() {
    this.auth.crrUser.subscribe(user => this.user = user);
    this.resetFormGroup();
    this.projectList = await this.projectService.fetchProjectAutocomplete().toPromise();
  }


  resetFormGroup() {
    this.projectTagList = [];
    this.totalHrSum = 0;
    this.totalMinSum = 0;
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
      this.utilsService.loader(true);
      this.totalHrSum = 0;
      this.totalMinSum = 0;
      let startDateStr = this.utilsService.convertDatePickerToThDate(this.startDate);
      let endDateStr = this.utilsService.convertDatePickerToThDate(this.endDate);
      this.projectTagList = await this.projectService.projectTagReport(this.project, startDateStr, endDateStr).map(async (callback: ProjectTagForm[]) => {
        for (let projectTag of callback) {
          let totalHr = 0;
          let totalMin = 0;
          for (let usr of projectTag.users) {
            // let user = await this.officerService.findByOfficeId(usr.ownerUserId).toPromise();
            // console.log(user)
            // usr.fullName = 'Biwswalker'
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
      if (this.projectTagList) {
        this.utilsService.loader(false);
      }
    }
  }

}

class ProjectTagForm {
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