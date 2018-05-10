import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../providers/authentication.service';
import { Status, Default } from '../../config/properties';
import { EventMessagesService } from '../../providers/utils/event-messages.service';
import { UtilsService } from '../../providers/utils/utils.service';
declare var spin: any;
declare var $: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public appVersion:string = '';
  public loginGroup: FormGroup;
  constructor(private authService: AuthenticationService,
    private eventMessageService: EventMessagesService,
    private utilService:UtilsService) { }

  async ngOnInit() {
    this.loginGroup = new FormGroup({
      username: new FormControl(localStorage.getItem(Default.USR) ? atob(localStorage.getItem(Default.USR)) : null, Validators.required),
      password: new FormControl(localStorage.getItem(Default.PWD) ? atob(localStorage.getItem(Default.PWD)) : null, Validators.required),
      remember: new FormControl(localStorage.getItem(Default.RMB) === Default.YES ? true : false)
    })
    this.appVersion = await this.utilService.getAppVersion();

  }

  ngAfterViewInit() {
    $('.modal').modal('hide');
    $(".modal-backdrop").hide();
  }

  async onLogin() {
    if (this.loginGroup.valid) {
      spin(true);
      await setTimeout(async () => {
        localStorage.setItem(Default.RFPWD, btoa(this.loginGroup.value.password));
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
        let logonResult = await this.authService.authen(this.loginGroup.value.username, this.loginGroup.value.password);
        if (logonResult === Status.SUCCESS) {
          result = true;
          spin(false);
          await this.authService.accessUser();
        } else {
          result = true;
          spin(false);
          console.log(Status.ERROR)
        }

        setTimeout(() => {
          spin(false);
          if (!result) {
            console.info('Connention timeout: Plz call 191.')
            this.eventMessageService.onCustomError('ไม่สามารถล็อกอินได้', 'Connention timeout');
          }
        }, 25000);
      }, 1500)
    }
  }

}
