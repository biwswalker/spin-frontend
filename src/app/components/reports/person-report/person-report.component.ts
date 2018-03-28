import { UtilsService } from './../../../providers/utils/utils.service';
import { AuthenticationService } from './../../../providers/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/user';

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
  public tableOrderByDate: boolean = false;
  public tableOrderByProject: boolean = false;
  public tableOrderByTag: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private utilsService: UtilsService
  ) {
    this.auth.crrUser.subscribe((user: User) => {
      this.officer = user.officer.firstNameTh + ' ' + user.officer.lastNameTh;
      if (user.userLevel === "A") {
        this.officer = "";
      }
    });
  }

  ngOnInit() {
    this.onReset();
  }

  onSearch() {
    this.utilsService.findInvalidControls(this.personReportFormGroup);
    if (this.personReportFormGroup.valid) {
      console.log(this.sortBy)
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
    this.officer = null;
    this.tableOrderByDate = false;
    this.tableOrderByProject = false;
    this.tableOrderByTag = false;
    this.personReportFormGroup = new FormGroup(
      {
        officer: new FormControl(this.officer, Validators.required),
        startDate: new FormControl(this.startDate, Validators.required),
        endDate: new FormControl(this.endDate, Validators.required)
      }
    )
  }

  onSubmitReport() {

  }

  orderByDate(form) {
    this.tableOrderByDate = true;
    this.tableOrderByProject = false;
    this.tableOrderByTag = false;
    console.log('orderByDate')
    console.log(form)
  }

  orderByProject(form) {
    this.tableOrderByDate = false;
    this.tableOrderByProject = true;
    this.tableOrderByTag = false;
    console.log('orderByProject')
    console.log(form)
  }

  orderByTag(form) {
    this.tableOrderByDate = false;
    this.tableOrderByProject = false;
    this.tableOrderByTag = true;
    console.log('orderByTag')
    console.log(form)
  }
}
