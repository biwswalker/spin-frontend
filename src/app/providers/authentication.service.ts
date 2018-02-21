import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Status } from '../config/properties';

@Injectable()
export class AuthenticationService {

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
          return this.request.requestMethodGET('user-management/users/me').toPromise()
            .then((user) => {
              if (user) {
                return Status.SUCCESS;
              }
              return Status.ERROR;
            }).catch(error => {
              console.log(error)
              return Status.ERROR;
            });
        } else {
          return Status.ERROR;
        }
      })
      .catch(error => {
        console.log(error)
        return Status.ERROR;
      })
  }

}
