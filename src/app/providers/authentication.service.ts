import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  public token: any;

  constructor(private request: HttpRequestService) { }

  authen() {
    var data = new FormData();
    data.append("grant_type", "password");
    data.append("username", "supreeya.ch");
    data.append("password", "104083");
    const headers = new HttpHeaders({
      "Authorization": "Basic c3Bpbi1zLWNsaWVudGlkOnNwaW4tcy1zZWNyZXQ="
    })
    const options = { headers: headers, withCredentials: true }
    this.request.requestMethodPOSTWithHeader('oauth/token', data, options).toPromise()
      .then(tkn => {
        console.log(tkn)
        this.token = tkn
      })
      .catch(error => console.log(error))
  }

}
