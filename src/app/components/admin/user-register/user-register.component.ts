import { EventMessagesService } from './../../../providers/utils/event-messages.service';
import { UserRegisterModalComponent } from './user-register-modal/user-register-modal.component';
import { Officer } from './../../../models/officer';
import { UtilsService } from './../../../providers/utils/utils.service';
import { AuthenticationService } from './../../../providers/authentication.service';
import { EventService } from './../../../providers/utils/event.service';
import { ProjectService } from './../../../providers/project.service';
import { UserRegisterService } from './../../../providers/userregister.service';
import { UserRegisterSearchComponent } from './user-register-search/user-register-search.component';
import { UserRegisterInfoComponent } from './user-register-info/user-register-info.component';
import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from '../../../models/user';
import { Mode } from "../../../config/properties";
import * as XLSX from "ts-xlsx";
import { mapTo } from "rxjs/operator/mapTo";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-user-register",
  templateUrl: "./user-register.component.html",
  styleUrls: ["./user-register.component.scss"]
})
export class UserRegisterComponent {
  arrayBuffer: any;
  public users: User[] = [];
  message: string;
  messagesPosition: any[];
  messagesDepartment: any[];
  messages: any[];
  record: number;
  file: any;
  fileName: string;
  isUpload: boolean;
  @ViewChild(UserRegisterInfoComponent) info;
  @ViewChild(UserRegisterSearchComponent) search;
  @ViewChild(UserRegisterModalComponent) userModal;

  constructor(
    protected userRegisterService: UserRegisterService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private utilsService: UtilsService,
    private eventMessageService: EventMessagesService
  ) {}

  ngAfterViewInit() {
    this.userModal.ngOnInit();
  }

  passKeyToChildrens(userId) {
    console.log("presskey: ", userId);
    this.info.ngOnInit();
    this.displayUserInfo(userId);
  }
  displayUserInfo(userId) {
    this.info.user = new User();
    this.info.userId = userId;
    this.userRegisterService.findByUserId(userId).subscribe(
      data => {
        console.log("data:", data);
        if (data) {
          this.info.user = data;
          console.log(this.info.user);
          this.info.officer = new Officer();
          this.userRegisterService.findByOfficerId(data.officeId).subscribe(
            officerdata => {
              this.info.officer = officerdata;
              console.log(this.info.officer);
              this.info.found = "Y";
            },
            err => {
              console.log(err);
            }
          );
        }
        console.log(this.info.found);
      },
      err => {
        console.log(err);
      }
    );
  }

  createUserRegister() {
    this.userModal.mode = Mode.I;
    this.userModal.ngOnInit();
    console.log("mode: ", this.userModal.mode);
    this.userModal.user = new User();
    this.userRegisterService.onOpenModal();
  }

  incomingfile(event) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }

  onCloseModal() {
    this.isUpload = false;
    this.fileName = "";
    this.file = null;
  }



  clearMessage() {
    this.messages = [];
    this.messagesDepartment = [];
    this.messagesPosition = [];
    this.message = "";
  }


}
