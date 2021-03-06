import { ByDateComponent } from './by-date/by-date.component';
import { TaskService } from './../../../providers/task.service';
import { UtilsService } from './../../../providers/utils/utils.service';
import { AuthenticationService } from './../../../providers/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { PersonReport } from '../../../models/person-report';
import { ByProjectComponent } from './by-project/by-project.component';
import { ByTagComponent } from './by-tag/by-tag.component';
import { PartnerService } from '../../../providers/partner.service';

@Component({
  selector: 'app-report-person',
  templateUrl: './person-report.component.html',
  styleUrls: ['./person-report.component.scss']
})
export class PersonReportComponent implements OnInit {

  public personReportFormGroup: FormGroup;
  public officer: string = ""
  public startDate: string = this.utilsService.displayCalendarDate(this.utilsService.getCurrentThDate());
  public endDate: string = this.utilsService.displayCalendarDate(this.utilsService.getCurrentThDate());
  public sortBy: number = 1;
  public user: User = new User;
  public tableOrderByDate: boolean = true;
  public tableOrderByProject: boolean = false;
  public tableOrderByTag: boolean = false;
  public reportPersonList: PersonReport[] = [];
  public userList: User[] = [];
  public userLevel: string;
  public minDate: string;

  @ViewChild(ByDateComponent) byDate;
  @ViewChild(ByProjectComponent) byProject;
  @ViewChild(ByTagComponent) byTag;

  constructor(
    private auth: AuthenticationService,
    private utilsService: UtilsService,
    private taskService: TaskService,
    private partnerService: PartnerService
  ) {
    this.auth.crrUser.subscribe((user: User) => {
      // console.log(user);
      this.officer = user.userId;
      this.userLevel = user.userLevel;
    });
  }

  ngOnInit() {
    this.onReset();
    this.initialUserList();
  }

  initialUserList() {
    this.partnerService.findAllUser().subscribe(
      userList => {
        this.userList = userList
        for (let user of this.userList) {
          if(user.officer){
            user.fullName = user.officer.firstNameTh + ' ' + user.officer.lastNameTh;
          }
        }
      }
    )
  }

  onSearch() {
    this.utilsService.loader(true);
    this.utilsService.findInvalidControls(this.personReportFormGroup);
    if (this.personReportFormGroup.valid) {
      if (this.sortBy == 1) {
        this.orderByDate(this.personReportFormGroup.value);
      } else if (this.sortBy == 2) {
        this.orderByProject(this.personReportFormGroup.value);
      } else {
        this.orderByTag(this.personReportFormGroup.value);
      }
    }
  }

  onReset() {
    this.startDate = this.utilsService.displayCalendarDate(this.utilsService.getCurrentThDate());
    this.endDate = this.utilsService.displayCalendarDate(this.utilsService.getCurrentThDate());
    this.sortBy = 1;
    this.tableOrderByDate = true;
    this.tableOrderByProject = false;
    this.tableOrderByTag = false;
    this.personReportFormGroup = new FormGroup(
      {
        officer: new FormControl(this.officer, Validators.required),
        startDate: new FormControl(this.startDate, Validators.required),
        endDate: new FormControl(this.endDate, Validators.required)
      });

    if (this.userLevel == 'A') {
      this.personReportFormGroup.controls['officer'].enable();
    } else {
      this.personReportFormGroup.controls['officer'].disable();
    }
  }

  onSubmitReport() {

  }

  async orderByDate(form) {
    this.tableOrderByDate = true;
    this.tableOrderByProject = false;
    this.tableOrderByTag = false;
    let startDateStr = this.utilsService.convertDatePickerToThDate(form.startDate);
    let endDateStr = this.utilsService.convertDatePickerToThDate(form.endDate);
    let byDate = await this.taskService.reportPersonByDate(startDateStr, endDateStr, this.officer)
      .map(async (result) => {
        console.log(result)
        if (result) {
          this.byDate.initialData(result);
        }
      }).toPromise();
  }

  async orderByProject(form) {
    this.tableOrderByDate = false;
    this.tableOrderByProject = true;
    this.tableOrderByTag = false;
    let startDateStr = this.utilsService.convertDatePickerToThDate(form.startDate);
    let endDateStr = this.utilsService.convertDatePickerToThDate(form.endDate);
    let orderByProjectList = await this.taskService.reportPersonByProject(startDateStr, endDateStr, this.officer)
      .map(async (callbackList) => {
        console.log(callbackList)
        if (callbackList) {
          this.byProject.initialData(callbackList);
        }
      }).toPromise();
  }

  async orderByTag(form) {
    this.tableOrderByDate = false;
    this.tableOrderByProject = false;
    this.tableOrderByTag = true;
    let startDateStr = this.utilsService.convertDatePickerToThDate(form.startDate);
    let endDateStr = this.utilsService.convertDatePickerToThDate(form.endDate);
    let orderByTagList = await this.taskService.reportPersonByTag(startDateStr, endDateStr, this.officer)
      .map(async (callbackList) => {
        if (callbackList) {
          this.byTag.initialData(callbackList);
        }
      }).toPromise();
  }

  onSelectUser(event) {
  }
}
