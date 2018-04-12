import { OfficerService } from './../../../../providers/officer.service';
import { Officer } from './../../../../models/officer';
import { User } from './../../../../models/user';
import { EventMessagesService } from './../../../../providers/utils/event-messages.service';
import { AuthenticationService } from './../../../../providers/authentication.service';
import { EventService } from './../../../../providers/utils/event.service';
import { UserRegisterService } from './../../../../providers/userregister.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Mode } from "./../../../../config/properties";

declare var SpinModal: any;
@Component({
  selector: "app-user-register-modal",
  templateUrl: "./user-register-modal.component.html",
  styleUrls: ["./user-register-modal.component.scss"]
})
export class UserRegisterModalComponent implements OnInit {
  public formGroup: FormGroup;
  public user: User = new User();
  public officer: Officer = new Officer();
  public modal = new SpinModal();

  constructor(
    private userRegisterService: UserRegisterService,
    private officerService: OfficerService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private eventMessageService: EventMessagesService
  ) {
    this.userRegisterService.key.subscribe(res => {
      this.getUserById(res);
    });
  }

  ngOnInit() {
    this.validateForm();
  }

  validateForm(){
    this.formGroup = new FormGroup({
      userLevel: new FormControl(this.user.userLevel, Validators.required),
      activeFlag: new FormControl(this.user.activeFlag, Validators.required),
      remark: new FormControl(this.user.remark),
    })
  }

  onSubmit() {
    console.log("onSubmitUpdate.....");
    this.user.officeId = this.officer.officeId;

    this.userRegisterService.updateUser(this.user).subscribe(
      res => {
        this.eventMessageService.onUpdateSuccess(res.userId);
      },
      error => {
        console.log(error);
      }
    );
    this.userRegisterService.onCloseModal();
  }

  onCloseModal() {
    this.userRegisterService.onCloseModal();
  }

  getUserById(userId) {
    this.userRegisterService.findByUserId(userId).subscribe(user => {
      this.user = user;
      this.userRegisterService
        .findByOfficerId(this.user.officeId)
        .subscribe(officer => {
          this.officer = officer;
        });
    });
  }

}
