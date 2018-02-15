import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL } from '../../config/properties';

@Injectable()
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  requestMethodGET(path: string): Observable<any> {
    console.log(`GET URL => ${URL + path}`);
    return this.http.get(URL + path);
  }

  requestMethodPOST(path: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    console.log(`POST URL => ${URL + path}`);
    console.log(`BODY => ${body}`);
    return this.http.post(URL + path, body, { responseType: 'json' });
  }

  requestWithProgress(mothod: string, path: string, param: any) {
    const body = JSON.stringify(param);
    console.log(`POST URL => ${URL + path}`);
    console.log(`BODY => ${body}`);
    const request = new HttpRequest(mothod, URL + path, body, { responseType: 'json', reportProgress: true });
    return this.http.request(request)
  }
}
