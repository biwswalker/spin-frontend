import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../../providers/authentication.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {



  public user: User = new User();
  public fullname = '';
  public email = '';


  constructor(private authService: AuthenticationService) {
    this.authService.crrUser.subscribe((user: User) => {
      this.user = user;
      if (this.user.email) {
        this.email = this.user.email;
      }
      if (this.user.officer) {
        this.fullname = `${this.user.officer.firstNameEn} ${this.user.officer.lastNameEn}`;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.user = new User();
    this.fullname = '';
    this.email = '';
  }

  logout() {
    this.authService.logout();
  }

}
