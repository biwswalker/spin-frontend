import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL } from '../../config/properties';

@Injectable()
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  requestMethodGET(path: string): Observable<any> {
    console.log(`GET URL => ${URL + path}`);
    return this.http.get(URL + path);
  }

  requestMethodDelete(path: string): Observable<any>{
    console.log(`GET URL => ${URL + path}`);
    return this.http.delete(URL + path);
  }

  requestMethodPOST(path: string, param: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": `application/json`
    })
    const body = JSON.stringify(param);
    console.log(`POST URL => ${URL + path}`);
    console.log(`BODY => ${body}`);
    return this.http.post(URL + path, body, { responseType: 'json', headers: headers });
  }

  requestMethodPUT(path: string, param: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": `application/json`
    })
    const body = JSON.stringify(param);
    console.log(`PUT URL => ${URL + path}`);
    console.log(`BODY => ${body}`);
    return this.http.put(URL + path, body, { responseType: 'json', headers: headers });
  }

  requestMethodPOSTWithHeader(path: string, param: any, options: any): Observable<any> {
    console.log(`POST URL => ${URL + path}`);
    console.log(param);
    return this.http.post(URL + path, param, options);
  }

  requestMethodPUTWithHeader(path: string, param: any, options: any): Observable<any> {
    console.log(`PUT URL => ${URL + path}`);
    console.log(param);
    return this.http.put(URL + path, param, options);
  }

  requestWithProgress(mothod: string, path: string, param: any) {
    const body = JSON.stringify(param);
    console.log(`POST URL => ${URL + path}`);
    console.log(`BODY => ${body}`);
    const request = new HttpRequest(mothod, URL + path, body, { responseType: 'json', reportProgress: true });
    return this.http.request(request)
  }
}
