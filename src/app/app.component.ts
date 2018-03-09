import { Component } from '@angular/core';
import { AuthenticationService } from './providers/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isAccess = false;

  constructor(private authService: AuthenticationService) {
    this.authService.crrAccess.subscribe(accesses => {
      if(this.authService.isInSession()){
        this.authService.accessUser();
        if(accesses){
          this.isAccess = true;
        }else{
          this.isAccess = false;
        }
      }else{
        this.isAccess = false;
      }
    })
  }
}
