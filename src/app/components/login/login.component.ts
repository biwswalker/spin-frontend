import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../providers/authentication.service';
import { Status } from '../../config/properties';
declare var spin: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginGroup: FormGroup;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.loginGroup = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      remember: new FormControl(null)
    })
  }

  onLogin() {
    // ("username", "supreeya.ch");
    // ("password", "104083");
    if (this.loginGroup.valid) {
      spin(true);
      setTimeout(() => {
        this.authService.authen(this.loginGroup.value.username, this.loginGroup.value.password).then((data) => {
          if (data == Status.SUCCESS) {
            console.log(Status.SUCCESS)
            spin(false);
          } else {
            console.log(Status.ERROR)
          }
        });
        setTimeout(() => {
          spin(false);
          console.info('Connention timeout: Plz call 191.')
        }, 30000);
      }, 2500)
    }
  }

}
