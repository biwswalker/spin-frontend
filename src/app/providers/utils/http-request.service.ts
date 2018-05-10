import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL } from '../../config/properties';

@Injectable()
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  requestMethodGET(path: string): Observable<any> {
    console.log('get URL: ',URL + path)
    return this.http.get(URL + path);
  }

  requestMethodDelete(path: string): Observable<any> {
    return this.http.delete(URL + path);
  }

  requestMethodPOST(path: string, param: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": `application/json`
    })
    const body = JSON.stringify(param);
    return this.http.post(URL + path, body, { responseType: 'json', headers: headers });
  }

  requestMethodPUT(path: string, param: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": `application/json`
    })
    const body = JSON.stringify(param);
    return this.http.put(URL + path, body, { responseType: 'json', headers: headers });
  }

  requestMethodPOSTWithHeader(path: string, param: any, options: any): Observable<any> {
    return this.http.post(URL + path, param, options);
  }

  requestMethodPUTWithHeader(path: string, param: any, options: any): Observable<any> {
    return this.http.put(URL + path, param, options);
  }
}
