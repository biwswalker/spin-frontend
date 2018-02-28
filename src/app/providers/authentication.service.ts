import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Status, Default } from '../config/properties';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  private isAccess = new BehaviorSubject<boolean>(false);
  public crrAccess = this.isAccess.asObservable();
  public currentUser: any;

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
          sessionStorage.setItem(Default.ACTOKN, token.access_token)
          sessionStorage.setItem(Default.TOKNTY, token.token_type)
          sessionStorage.setItem(Default.RFTOKN, token.refresh_token)
          this.isAccess.next(true);
          return this.request.requestMethodGET('user-management/users/me').toPromise()
            .then((user) => {
              console.log(user)
              if (user) {
                return Status.SUCCESS;
              } else {
                console.log('error user')
                // this.token = null
                // this.isAccess.next(false)
                return Status.ERROR;
              }
            }).catch(error => {
              console.log(error)
              // this.token = null
              // this.isAccess.next(false)
              return Status.ERROR;
            });
        } else {
          console.log('error token')
          this.isAccess.next(false)
          return Status.ERROR;
        }
      })
      .catch(error => {
        console.log(error)
        sessionStorage.removeItem(Default.ACTOKN);
        sessionStorage.removeItem(Default.TOKNTY);
        sessionStorage.removeItem(Default.RFTOKN);
        this.isAccess.next(false)
        return Status.ERROR;
      })
  }

  refreshToken(): Observable<string> {
    let token: any = sessionStorage.getItem(Default.ACTOKN);
    return Observable.of(token.refresh_token).delay(200);
  }

  logout() {
    let acces_token: any = sessionStorage.getItem(Default.ACTOKN);
    this.request.requestMethodGET(`logout/${acces_token}`).subscribe((response: Response) => console.log(response))
    sessionStorage.removeItem(Default.ACTOKN)
    sessionStorage.removeItem(Default.TOKNTY)
    sessionStorage.removeItem(Default.RFTOKN)
    this.isAccess.next(false)
  }

  isInSession(): boolean {
    if (sessionStorage.getItem(Default.ACTOKN)) {
      return true;
    }
    return false;
  }
}
