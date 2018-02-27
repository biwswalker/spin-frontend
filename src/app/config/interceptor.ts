import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../providers/authentication.service';
import { Default } from './properties';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private auth: AuthenticationService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token:any = sessionStorage.getItem(Default.TKN);
        if (token.access_token) {
            const headers = {
                'Authorization': `${token.token_type} ${token.access_token}`
            };
            const request = req.clone({
                headers: req.headers.set('Authorization', `${token.token_type} ${token.access_token}`)
            });
            return next.handle(request);
        }
        return next.handle(req);
    }
}