import { Component } from '@angular/core';
import { AuthenticationService } from './providers/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isAccess = false;
  private isRequested = false;

  constructor(private authService: AuthenticationService) {
    this.authService.crrAccess.subscribe(accesses => {
      if (this.authService.isInSession()) {
        if (!this.isRequested) {
          console.log('request')
          this.authService.accessUser();
          this.isRequested = true;
        }
        this.isAccess = true;
      } else {
        this.isAccess = false;
      }

    })
  }
}
