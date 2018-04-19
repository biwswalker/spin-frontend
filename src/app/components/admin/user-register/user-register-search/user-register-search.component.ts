import { Leave } from './../../../../models/leave';
import { EventMessagesService } from './../../../../providers/utils/event-messages.service';
import { Observable } from 'rxjs/Observable';
import { UserRegisterService } from './../../../../providers/userregister.service';
import { User } from './../../../../models/user';
import { Component, OnInit, Output } from '@angular/core';
import { UserRegisterComponent } from '../user-register.component';
import { EventEmitter } from "@angular/core";
import { Mode } from "./../../../../config/properties";

@Component({
  selector: "app-user-register-search",
  templateUrl: "./user-register-search.component.html",
  styleUrls: ["./user-register-search.component.scss"]
})
export class UserRegisterSearchComponent implements OnInit {
  public userSelected: User = new User();
  public userList: any = [];
  public page = 1;
  public size = 20;
  public total = 0;

  public throttle = 1000;
  public scrollDistance = 1;
  public keyword = "";

  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private userRegisterService: UserRegisterService,
    private eventMessagesService: EventMessagesService
  ) {}

  ngOnInit() {
    this.doSearch();
  }

  onScrollDownWithKeyword() {
      this.userRegisterService
        .findAllByCriteria(this.keyword, this.page, this.size)
        .subscribe(
          data => {
            this.total = data.totalElements;
            console.log(data)
            if (data) {
              this.userList = this.userList.concat(data);
              if (this.userList.length !== 0 && this.page === 1) {
                this.onUserSelected(this.userList[0]);
              }
              this.page += 1;
            }
          },
          err => {
            console.log(err);
          }
        );

  }

  onUserSelected(user) {
    console.log("selected user");
    this.userSelected = user;
    console.log(this.userSelected);
    this.messageEvent.emit(user.userId);
  }

  doSearch() {
    this.page = 1;
    this.userList = null;
    this.userList = [];
    this.onScrollDownWithKeyword();
  }

}
