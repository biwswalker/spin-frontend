import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../providers/authentication.service';
import { Default } from './properties';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private auth: AuthenticationService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let access_token:any = sessionStorage.getItem(Default.ACTOKN);
        let token_type:any = sessionStorage.getItem(Default.TOKNTY);
        if (access_token) {
            const headers = {
                'Authorization': `${token_type} ${access_token}`
            };
            const request = req.clone({
                headers: req.headers.set('Authorization', `${token_type} ${access_token}`)
            });
            return next.handle(request);
        }
        return next.handle(req);
    }
}