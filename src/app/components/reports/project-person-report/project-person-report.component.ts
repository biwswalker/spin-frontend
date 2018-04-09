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
  public projectPerson: any;

  constructor(private auth: AuthenticationService, private utilsService: UtilsService, private projectService: ProjectService, private reportService: ReportService
  ) {
  }

  async ngOnInit() {
    this.resetFormGroup();
    await this.auth.crrUser.subscribe(user => this.user = user);
    this.projectList = await this.projectService.fetchProjectAutocomplete().toPromise();
  }


  resetFormGroup() {
    this.projectPerson = null;
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
      let startDateStr = this.utilsService.convertDatePickerToThDate(this.startDate);
      let endDateStr = this.utilsService.convertDatePickerToThDate(this.endDate);
      this.projectPerson = await this.projectService.projectPersonReport(this.project, startDateStr, endDateStr).toPromise().catch(err => this.utilsService.loader(false));
      this.utilsService.loader(false);
    }
  }

}
