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
  public user: User = new User();
  public officer: Officer = new Officer();
  public modal = new SpinModal();
  public userName: string;
  public users: User[] = [];

  public officerList: Officer[] = [];
  public fullName: string = "";

  public mode: string;
  public headerText: string = "";

  constructor(
    private userRegisterService: UserRegisterService,
    private officerService: OfficerService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private eventMessageService: EventMessagesService
  ) {
    this.userRegisterService.key.subscribe(res => {
      this.getUserById(res);
      console.log(this.user);
      this.mode = Mode.E;
      this.headerText = "แก้ไข";
      console.log(this.user.userId);
    });
  }

  ngOnInit() {
    if (this.mode === Mode.I) {
      this.headerText = "เพิ่ม";
    } else {
      this.headerText = "แก้ไข";
    }

    this.officerService.fetchAllOfficerAutocomplete("A").subscribe(
      data => {
        this.officerList = [];
        for (let officer of data) {
          officer.fullName = officer.firstNameTh + " " + officer.lastNameTh;
          this.officerList = this.officerList.concat(officer);
        }
      },
      err => {
        console.log(err);
      }
    );
    console.log("ngOnInit mode: ", this.mode);
  }

  reset() {
    console.log("reset..............");
    this.fullName = "";
    this.user = new User();
    this.headerText = "";
  }

  onSelectedOfficer(event) {
    console.log("onSelectedOfficer...");
    this.officer = event.item;
    this.fullName = this.officer.firstNameTh + " " + this.officer.lastNameTh;
    console.log("selected: ", this.fullName);
  }

  onSubmit() {
    console.log("mode: ", this.mode);
    if (this.mode == Mode.I) {
      this.onSubmitInsert();
    } else if (this.mode == Mode.E) {
      this.onSubmitUpdate();
    }
  }

  onChangeOfficer(event) {
    console.log("onChangeOfficer...");
  }

  onSubmitInsert() {
    console.log("onSubmitInsert.....");
    this.user.officeId = this.officer.officeId;
    console.log("user", this.user);
    this.userRegisterService.createUser(this.user).subscribe(
      res => {
        console.log(res);
        this.eventMessageService.onInsertSuccess(res.userId);
      },
      error => {
        console.log(error);
      }
    );
    this.userRegisterService.onCloseModal();
  }

  onSubmitUpdate() {
    console.log("onSubmitUpdate.....");
    this.user.officeId = this.officer.officeId;
    console.log("user", this.user);
    this.userRegisterService.updateUser(this.user).subscribe(res => {
        console.log(res);
        this.eventMessageService.onUpdateSuccess(res.userId);
      }, error => {
        console.log(error);
      });
    this.userRegisterService.onCloseModal();
  }

  onCloseModal() {
    this.userRegisterService.onCloseModal();
  }

  getUserById(userId) {
    this.userRegisterService.findByUserId(userId).subscribe(user => {
      this.user = user;
      this.userRegisterService.findByOfficerId(this.user.officeId).subscribe(
        officer => {
          this.officer = officer;
          this.fullName = this.officer.firstNameTh + " " + this.officer.lastNameTh;
        }
      );
    });

  }
}
