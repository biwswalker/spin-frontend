import { OfficerService } from './../../../../providers/officer.service';
import { Officer } from './../../../../models/officer';
import { User } from './../../../../models/user';
import { EventMessagesService } from './../../../../providers/utils/event-messages.service';
import { AuthenticationService } from './../../../../providers/authentication.service';
import { EventService } from './../../../../providers/utils/event.service';
import { UserRegisterService } from './../../../../providers/userregister.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

declare var SpinModal: any;
@Component({
  selector: "app-user-register-modal",
  templateUrl: "./user-register-modal.component.html",
  styleUrls: ["./user-register-modal.component.scss"]
})
export class UserRegisterModalComponent implements OnInit {
  public user: User = new User();
  public modal = new SpinModal();
  public userName: string;
  public users: User[] = [];

  public officerList: Officer[] = [];

  constructor(
    private userRegisterService: UserRegisterService,
    private officerService: OfficerService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private eventMessageService: EventMessagesService
  ) {}

  ngOnInit() {
    this.officerService.fetchAllAutocomplete("A").subscribe(
      data=>{
        this.officerList = data;
        console.log("officerList: ",this.officerList.length);
      }
    )
  }

  onCreate() {
    console.log("onCreateModal...");
    this.onOpenModal();
    this.user = new User();
  }

  onCloseModal() {
    this.modal.close("#user-modal");
  }
  onOpenModal() {
    this.modal.initial("#user-modal", {
      show: true,
      backdrop: "static",
      keyword: true
    });
  }
  onSelectedMember(event) {
    console.log("onSelectedMember...");
    this.user = event.item;
    this.userName =
      this.user.officer.firstNameTh + " " + this.user.officer.lastNameTh;
  }

  onSubmit() {}

  onChangeOfficer(event){

  }


}
