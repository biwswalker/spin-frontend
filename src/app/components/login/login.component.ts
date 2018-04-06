import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../providers/authentication.service';
import { Status, Default } from '../../config/properties';
import { EventMessagesService } from '../../providers/utils/event-messages.service';
declare var spin: any;
declare var $: any
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {


  private

  public loginGroup: FormGroup;

  constructor(private authService: AuthenticationService, private eventMessageService: EventMessagesService) { }

  ngOnInit() {
    this.loginGroup = new FormGroup({
      username: new FormControl(localStorage.getItem(Default.USR) ? atob(localStorage.getItem(Default.USR)) : null, Validators.required),
      password: new FormControl(localStorage.getItem(Default.PWD) ? atob(localStorage.getItem(Default.PWD)) : null, Validators.required),
      remember: new FormControl(localStorage.getItem(Default.RMB) === Default.YES ? true : false)
    })
  }

  ngAfterViewInit() {
    $('.modal').modal('hide');
  }

  onLogin() {
    if (this.loginGroup.valid) {
      spin(true);
      setTimeout(() => {
        if (this.loginGroup.value.remember) {
          localStorage.setItem(Default.USR, btoa(this.loginGroup.value.username))
          localStorage.setItem(Default.PWD, btoa(this.loginGroup.value.password))
          localStorage.setItem(Default.RMB, Default.YES)
        } else {
          localStorage.removeItem(Default.USR)
          localStorage.removeItem(Default.PWD)
          localStorage.removeItem(Default.RMB)
        }
        let result = false;
        this.authService.authen(this.loginGroup.value.username, this.loginGroup.value.password).then((data) => {
          result = true;
          if (data == Status.SUCCESS) {
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
            this.eventMessageService.onCustomError('ไม่สามารถล็อกอินได้', 'Connention timeout');
          }
        }, 25000);
      }, 2500)
    }
  }

}
