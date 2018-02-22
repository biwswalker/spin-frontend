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
    if (this.loginGroup.valid) {
      spin(true);
      setTimeout(() => {
        let result = false;
        this.authService.authen(this.loginGroup.value.username, this.loginGroup.value.password).then((data) => {
          result = true;
          if (data == Status.SUCCESS) {
            console.log(Status.SUCCESS)
            spin(false);
          } else {
            spin(false);
            console.log(Status.ERROR)
          }
        });
        setTimeout(() => {
          spin(false);
          if (!result) {
            console.info('Connention timeout: Plz call 191.')
          }
        }, 25000);
      }, 2500)
    }
  }

}
