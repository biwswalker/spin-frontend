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
  private userSubject = new BehaviorSubject<User>(new User());
  public crrUser = this.userSubject.asObservable();
  public user = new User();
  public notAuthorization = false;

  constructor(private request: HttpRequestService) {
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
          sessionStorage.setItem(Default.ACTOKN, token.access_token)
          sessionStorage.setItem(Default.TOKNTY, token.token_type)
          sessionStorage.setItem(Default.RFTOKN, token.refresh_token)
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
        sessionStorage.removeItem(Default.ACTOKN);
        sessionStorage.removeItem(Default.TOKNTY);
        sessionStorage.removeItem(Default.RFTOKN);
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
    console.log('logout')
    // this.notAuthorization = true;
    // let acces_token: any = sessionStorage.getItem(Default.ACTOKN);
    // if (acces_token) {
    //   return this.request.requestMethodGET(`log-out/${acces_token}`).subscribe((response: Response) => {
    //     this.notAuthorization = false;
    //     this.removeToken();
    //     this.isAccess.next(false)
    //   },
    //     error => {
    //       this.notAuthorization = false;
    //       this.removeToken();
    //       this.isAccess.next(false)
    //     });
    // } else {
    // this.notAuthorization = false;
    this.removeToken();
    this.isAccess.next(false)
    // }
  }

  changePassword(passwordObject:any){
    console.log('changePassword')
    return this.request.requestMethodPOST('user-management/users/change-password',passwordObject);
  }

  isInSession(): boolean {
    if (sessionStorage.getItem(Default.ACTOKN)) {
      return true;
    }
    return false;
  }

  getNowToken(): string {
    let access_token: any = sessionStorage.getItem(Default.ACTOKN);
    let token_type: any = sessionStorage.getItem(Default.TOKNTY);
    if (access_token) {
      return `${token_type} ${access_token}`;
    }
    return '';
  }

  getRefreshToken(): string {
    let refresh_token: any = sessionStorage.getItem(Default.RFTOKN);
    if (refresh_token) {
      return `${refresh_token}`;
    }
    return '';
  }

  isRefresh() {
    return this.notAuthorization;
  }

  removeToken() {
    sessionStorage.removeItem(Default.ACTOKN)
    sessionStorage.removeItem(Default.TOKNTY)
    sessionStorage.removeItem(Default.RFTOKN)
  }

  refreshToken(): Observable<string> {
    console.log('refresh token')
    this.notAuthorization = true;
    const headers = new HttpHeaders({
      "Authorization": `Basic ${btoa('spin-s-clientid:spin-s-secret')}`
    })
    const options = { headers: headers }
    return this.request.requestMethodPOSTWithHeader(`oauth/token?grant_type=refresh_token&refresh_token=${this.getRefreshToken()}`, '', options).map(token => {
      this.notAuthorization = false;
      if (token) {
        sessionStorage.setItem(Default.ACTOKN, token.access_token)
        sessionStorage.setItem(Default.TOKNTY, token.token_type)
        sessionStorage.setItem(Default.RFTOKN, token.refresh_token)
        this.isAccess.next(true);
        this.accessUser();
        return this.getNowToken();
      } else {
        console.log('Refresh Error')
        this.removeToken();
        this.isAccess.next(false)
        return Status.ERROR;
      }
    }, error => this.notAuthorization = false)
  }
}
