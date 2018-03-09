import { Leave } from './../../../../models/leave';
import { EventMessagesService } from './../../../../providers/utils/event-messages.service';
import { Observable } from 'rxjs/Observable';
import { UserRegisterService } from './../../../../providers/userregister.service';
import { User } from './../../../../models/user';
import { Component, OnInit, Output } from '@angular/core';
import { UserRegisterComponent } from '../user-register.component';
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-user-register-search',
  templateUrl: './user-register-search.component.html',
  styleUrls: ['./user-register-search.component.scss']
})
export class UserRegisterSearchComponent implements OnInit {
  public userSelected: User = new User;
  public userList: any = [];
  public page = 1;
  public size = 6;

  public throttle = 1000;
  public scrollDistance = 1;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private userRegisterService: UserRegisterService,
    private eventMessagesService: EventMessagesService,
  ) {}

  ngOnInit() {
   this.onScrollDown();
  }

  onScrollDown() {
    console.log('onScrollDown...');
    this.userRegisterService.findAll('A', this.page, this.size).subscribe(
      data => {
        if (data) {
          this.userList = this.userList.concat(data.content);
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
    console.log('selected user');
    this.userSelected = user;
    this.messageEvent.emit(user.userId);
  }
}
