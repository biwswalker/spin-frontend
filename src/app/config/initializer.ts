import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../providers/authentication.service';
import { Status } from './properties';

@Injectable()
export class Initializer {
    constructor(private authService: AuthenticationService) {
    }

    async load() {
        let stateUser = await this.authService.accessUser();
        if (stateUser === Status.SUCCESS) {
            this.authService.isAccess.next(true);
        } else {
            this.authService.isAccess.next(false);
        }
    }
}