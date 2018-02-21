import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../providers/authentication.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private auth: AuthenticationService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.token) {
            const headers = {
                'Authorization': `${this.auth.token.token_type} ${this.auth.token.access_token}`
            };
            const request = req.clone({
                headers: req.headers.set('Authorization', `${this.auth.token.token_type} ${this.auth.token.access_token}`)
            });
            return next.handle(request);
        }
        return next.handle(req);
    }
}