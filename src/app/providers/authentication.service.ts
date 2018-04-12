import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Status, Default } from '../config/properties';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { EventMessagesService } from './utils/event-messages.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  public isAccess = new BehaviorSubject<boolean>(false);
  public crrAccess = this.isAccess.asObservable();
  private userSubject = new BehaviorSubject<User>(new User());
  public crrUser = this.userSubject.asObservable();
  public user = new User();
  public notAuthorization = false;

  constructor(private request: HttpRequestService,
    private eventMessageService: EventMessagesService) {
  }

  authen(username: string, password: string) {
    this.notAuthorization = true;
    var data = new FormData();
    data.append("grant_type", "password");
    data.append("username", username);
    data.append("password", password);
    const headers = new HttpHeaders({
      "Authorization": `Basic ${btoa('spin-s-clientid:spin-s-secret')}`
    })
    const options = { headers: headers }
    return this.request.requestMethodPOSTWithHeader('oauth/token', data, options).toPromise()
      .then(token => {
        this.notAuthorization = false;
        if (token) {
          localStorage.setItem(Default.ACTOKN, btoa(token.access_token));
          localStorage.setItem(Default.TOKNTY, btoa(token.token_type));
          localStorage.setItem(Default.RFTOKN, btoa(token.refresh_token));
          this.isAccess.next(true);
          return this.accessUser();

        } else {
          console.log('error token')
          this.isAccess.next(false)
          return Status.ERROR;
        }
      })
      .catch(error => {
        this.notAuthorization = false;
        console.log(error)
        if (error.status != 0)
          this.eventMessageService.onCustomError('ไม่สามารถล็อกอินได้', error.error.description);

        localStorage.removeItem(Default.ACTOKN);
        localStorage.removeItem(Default.TOKNTY);
        localStorage.removeItem(Default.RFTOKN);
        this.isAccess.next(false)
        return Status.ERROR;
      })
  }

  accessUser(): Promise<string> {
    return this.request.requestMethodGET('user-management/users/me').toPromise()
      .then((user) => {
        if (user) {
          let accessesUser = new User();
          accessesUser = user.User;
          if (user.Officer) {
            accessesUser.officer = user.Officer;
          }
          if (user.Department) {
            accessesUser.department = user.Department;
          }
          this.user = accessesUser;
          this.userSubject.next(accessesUser);
          return Status.SUCCESS;
        } else {
          this.refreshToken()
          console.log('error user')
          return Status.ERROR;
        }
      }).catch(error => {
        console.log(error)
        // alert('หมดอายุการใช้งาน กรุณาเข้าสู่ระบบใหม่')
        this.logout();
        return Status.ERROR;
      });
  }

  getUser(): User {
    return this.user;
  }

  logout() {
    this.removeToken();
    this.isAccess.next(false)
  }

  changePassword(passwordObject: any) {
    return this.request.requestMethodPOST('user-management/users/change-password', passwordObject);
  }

  isInSession(): boolean {
    if (localStorage.getItem(Default.ACTOKN)) {
      return true;
    }
    return false;
  }

  getNowToken(): string {
    let access_token: any = localStorage.getItem(Default.ACTOKN);
    let token_type: any = localStorage.getItem(Default.TOKNTY);
    if (access_token) {
      return `${atob(token_type)} ${atob(access_token)}`;
    }
    return '';
  }

  getRefreshToken(): string {
    let refresh_token: any = localStorage.getItem(Default.RFTOKN);
    if (refresh_token) {
      return `${atob(refresh_token)}`;
    }
    return '';
  }

  isRefresh() {
    return this.notAuthorization;
  }

  removeToken() {
    localStorage.removeItem(Default.ACTOKN)
    localStorage.removeItem(Default.TOKNTY)
    localStorage.removeItem(Default.RFTOKN)
    localStorage.removeItem(Default.RFPWD);
  }

  refreshToken(): Observable<string> {
    this.notAuthorization = true;
    var data = new FormData();
    data.append("grant_type", "refresh_token");
    data.append("password", atob(localStorage.getItem(Default.RFPWD)));
    const headers = new HttpHeaders({
      "Authorization": `Basic ${btoa('spin-s-clientid:spin-s-secret')}`
    })
    const options = { headers: headers }
    if (this.getRefreshToken()) {
      return this.request.requestMethodPOSTWithHeader(`oauth/token?grant_type=refresh_token&refresh_token=${this.getRefreshToken()}`, data, options).map(token => {
        this.notAuthorization = false;
        if (token) {
          localStorage.setItem(Default.ACTOKN, btoa(token.access_token));
          localStorage.setItem(Default.TOKNTY, btoa(token.token_type));
          localStorage.setItem(Default.RFTOKN, btoa(token.refresh_token));
          this.isAccess.next(true);
          this.accessUser();
          return this.getNowToken();
        } else {
          console.log('Refresh Error')
          this.removeToken();
          this.isAccess.next(false)
          return Status.ERROR;
        }
      }, error => {
        this.notAuthorization = false
        alert('หมดอายุการใช้งาน กรุณาเข้าสู่ระบบใหม่')
        this.logout();
      })
    } else {
      this.notAuthorization = false
      return Observable.of(Status.ERROR)
    }
  }
}
