import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL } from '../../config/properties';

@Injectable()
export class HttpRequestService {

  constructor(private http: HttpClient, private csrfToken: HttpXsrfTokenExtractor) { }

  requestMethodGET(path: string): Observable<any> {
    // let csrf = this.csrfToken.getToken() as string;
    return this.http.get(URL + path);
  }

  requestMethodDelete(path: string): Observable<any> {
    // let csrf = this.csrfToken.getToken() as string;
    return this.http.delete(URL + path);
  }

  requestMethodPOST(path: string, param: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": `application/json`
    })
    const body = JSON.stringify(param);
    // let csrf = this.csrfToken.getToken() as string;
    return this.http.post(URL + path, body, { responseType: 'json', headers: headers });
  }

  requestMethodPUT(path: string, param: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": `application/json`
    })
    const body = JSON.stringify(param);
    // let csrf = this.csrfToken.getToken() as string;
    return this.http.put(URL + path, body, { responseType: 'json', headers: headers });
  }

  requestMethodPOSTWithHeader(path: string, param: any, options: any): Observable<any> {
    // let csrf = this.csrfToken.getToken() as string;
    return this.http.post(URL + path, param, options);
  }

  requestMethodPUTWithHeader(path: string, param: any, options: any): Observable<any> {
    // let csrf = this.csrfToken.getToken() as string;
    return this.http.put(URL + path, param, options);
  }
}
