import { Component } from '@angular/core';
import { AuthenticationService } from './providers/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private isAccess = false;

  constructor(private authService: AuthenticationService) {
    this.authService.crrAccess.subscribe(accesses => {
      this.isAccess = accesses;
    })
  }
}
