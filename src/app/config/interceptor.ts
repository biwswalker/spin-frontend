import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../providers/authentication.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const auth = this.injector.get(AuthenticationService);
        let req = request;
        if (auth.getNowToken()) {
            req = request.clone({
                headers: request.headers.set('Authorization', auth.getNowToken())
            });
        }
        return next.handle(req)
        // .do(
        //     () => { },
        //     (error: any) => {
        //         console.log(error)
        //         if (error instanceof HttpErrorResponse) {
        //             if (error.status === 401) {
        //                 // console.log('GGWP :: ' + error.status);
        //                 // auth.refreshToken().catch(err => {
        //                 //     console.log(err);
        //                 //     auth.logout();
        //                 // });
        //             }
        //         }
        //     });
    }
}