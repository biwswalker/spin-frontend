import { Component, NgZone } from '@angular/core';
import { AuthenticationService } from './providers/authentication.service';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isAccess = false;
  private isRequested = false;

  constructor(private authService: AuthenticationService, private zone: NgZone) {
    this.authService.crrAccess.subscribe(accesses => {
      if (this.authService.isInSession()) {
        if (!this.isRequested) {
          console.log('request')
          // this.zone.run(() => { // <== added
          this.authService.accessUser();
          this.isRequested = true;
          // });
        }
        this.isAccess = true;
        $('#task-modal').on("hidden.bs.modal");
        $('#project-modal').on("hidden.bs.modal");
      } else {
        this.isAccess = false;
      }

    })
  }
}
