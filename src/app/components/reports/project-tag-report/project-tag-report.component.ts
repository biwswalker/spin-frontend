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
  public totalSum = 0;

  constructor(private auth: AuthenticationService, private utilsService: UtilsService, private projectService: ProjectService, private reportService: ReportService
    // , private officerService: OfficerService
  ) {
  }

  ngOnInit() {
    this.auth.crrUser.subscribe(user => this.user = user);
    this.resetFormGroup();
    this.projectService.fetchProjectAutocomplete().subscribe(projects => {
      this.projectList = projects;
    });
  }


  resetFormGroup() {
    this.projectTagList = [];
    this.totalSum = 0;
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
      this.totalSum = 0;
      let startDateStr = this.utilsService.convertDatePickerToThDate(this.startDate);
      let endDateStr = this.utilsService.convertDatePickerToThDate(this.endDate);
      this.projectTagList = await this.projectService.projectTagReport(this.project, startDateStr, endDateStr).map(async (callback: ProjectTagForm[]) => {
        for (let projectTag of callback) {
          let sum = 0;
          for (let usr of projectTag.users) {
            // let user = await this.officerService.findByOfficeId(usr.ownerUserId).toPromise();
            // console.log(user)
            // usr.fullName = 'Biwswalker'
            let total = usr.sumAsMin;
            total += (usr.sumAsHour * 60);
            sum += total;
          }
          projectTag.totalTime = sum;
          this.totalSum += sum;
        }
        return callback;
      }).toPromise();
      if(this.projectTagList){
        this.utilsService.loader(false);
      }
    }
  }

}

class ProjectTagForm {
  public tagName: string;
  public users: any[];
  public totalTime: number;

  constructor() {
    this.tagName = '';
    this.users = [];
    this.totalTime = null;
  }
}