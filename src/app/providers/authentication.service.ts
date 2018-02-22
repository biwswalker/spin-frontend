import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Status } from '../config/properties';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {

  private isAccess = new BehaviorSubject<boolean>(false);
  public crrAccess = this.isAccess.asObservable();
  public token: any;
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
    const options = { headers: headers, withCredentials: true }
    return this.request.requestMethodPOSTWithHeader('oauth/token', data, options).toPromise()
      .then(token => {
        if (token) {
          this.token = token
          this.isAccess.next(true)
          return this.request.requestMethodGET('user-management/users/me').toPromise()
            .then((user) => {
              console.log(user)
              if (user) {
                return Status.SUCCESS;
              } else {
                console.log('error user')
                this.token = null
                this.isAccess.next(false)
                return Status.ERROR;
              }
            }).catch(error => {
              console.log(error)
              this.token = null
              this.isAccess.next(false)
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
        this.token = null
        this.isAccess.next(false)
        return Status.ERROR;
      })
  }

}
