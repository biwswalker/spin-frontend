import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Status, Default } from '../config/properties';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Subject } from 'rxjs';

@Injectable()
export class AuthenticationService {

  private isAccess = new BehaviorSubject<boolean>(false);
  public crrAccess = this.isAccess.asObservable();
  private userSubject = new Subject<User>();
  public crrUser = this.userSubject.asObservable();
  public user = new User();
  public refreshTko = false;
  constructor(private request: HttpRequestService) { }

  authen(username: string, password: string) {
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
        if (token) {
          localStorage.setItem(Default.ACTOKN, token.access_token)
          localStorage.setItem(Default.TOKNTY, token.token_type)
          localStorage.setItem(Default.RFTOKN, token.refresh_token)
          this.isAccess.next(true);
          return this.accessUser();
        } else {
          console.log('error token')
          this.isAccess.next(false)
          return Status.ERROR;
        }
      })
      .catch(error => {
        console.log(error)
        localStorage.removeItem(Default.ACTOKN);
        localStorage.removeItem(Default.TOKNTY);
        localStorage.removeItem(Default.RFTOKN);
        this.isAccess.next(false)
        return Status.ERROR;
      })
  }

  refreshToken() {
    console.log('refresh tok')
    this.refreshTko = true;
    const headers = new HttpHeaders({
      "Authorization": `Basic ${btoa('spin-s-clientid:spin-s-secret')}`
    })
    const options = { headers: headers }
    return this.request.requestMethodPOSTWithHeader(`oauth/token?grant_type=refresh_token&refresh_token=${this.getRefreshToken()}`, '', options).toPromise()
      .then(token => {
        this.refreshTko = false;
        if (token) {
          localStorage.setItem(Default.ACTOKN, token.access_token)
          localStorage.setItem(Default.TOKNTY, token.token_type)
          localStorage.setItem(Default.RFTOKN, token.refresh_token)
          this.isAccess.next(true);
          return this.accessUser();
        } else {
          this.isAccess.next(false)
          return Status.ERROR;
        }
      })
      .catch(error => {
        this.refreshTko = false;
        console.log(error)
        this.removeToken();
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
        return Status.ERROR;
      });
  }

  getUser(): User {
    return this.user;
  }

  logout() {
    let acces_token: any = localStorage.getItem(Default.ACTOKN);
    this.request.requestMethodGET(`logout/${acces_token}`).subscribe((response: Response) => console.log(response))
    this.removeToken();
    this.isAccess.next(false)
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
      return `${token_type} ${access_token}`;
    }
    return '';
  }

  getRefreshToken(): string {
    let refresh_token: any = localStorage.getItem(Default.RFTOKN);
    if (refresh_token) {
      return `${refresh_token}`;
    }
    return '';
  }

  isRefresh() {
    return this.refreshTko;
  }

  removeToken() {
    localStorage.removeItem(Default.ACTOKN)
    localStorage.removeItem(Default.TOKNTY)
    localStorage.removeItem(Default.RFTOKN)
  }
}
