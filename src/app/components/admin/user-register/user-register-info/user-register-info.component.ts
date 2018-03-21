import { UserRegisterModalComponent } from './../user-register-modal/user-register-modal.component';
import { Officer } from './../../../../models/officer';
import { User } from './../../../../models/user';
import { UserRegisterService } from '../../../../providers/userregister.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { Mode } from "./../../../../config/properties";

@Component({
  selector: "app-user-register-info",
  templateUrl: "./user-register-info.component.html",
  styleUrls: ["./user-register-info.component.scss"]
})
export class UserRegisterInfoComponent implements OnInit {

  public user: User = new User();
  public officer: Officer = new Officer();
  public userId: string;
  public found: string;

  constructor(private userRegisterService: UserRegisterService) {}

  ngOnInit() {}

  ngAfterViewInit() {

  }

  updateUserRegister(event) {
    this.userRegisterService.emit(this.user.userId);
    this.userRegisterService.onOpenModal();
  }

}
