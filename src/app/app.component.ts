import { Component, NgZone, OnInit } from '@angular/core';
import { AuthenticationService } from './providers/authentication.service';
import { UtilsService } from './providers/utils/utils.service';
import { Status } from './config/properties';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
var pjson = require('../../package.json');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public loading = false;
  public isAccess = false;
  private isRequested = false;
  private currentUrl;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService, private utilService: UtilsService) {
    this.currentUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.utilService.loader(true);
    this.load();
  }

  async load() {
    let stateUser = await this.authService.accessUser().catch(err => console.log('Initializer Error : ', err));
    if (stateUser === Status.SUCCESS) {
      this.authService.isAccess.next(true);
    } else {
      this.authService.isAccess.next(false);
    }

    this.authService.crrAccess.subscribe(accesses => {
      if (accesses) {
        this.isAccess = true;
        // this.currentUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if (this.currentUrl === '/login' || this.currentUrl === '/') {
          this.router.navigateByUrl('attendance');
        } else {
          console.log(this.currentUrl)
          this.router.navigateByUrl(this.currentUrl);
        }
      } else {
        this.isAccess = false;
        this.router.navigateByUrl('login');
      }
    })

    this.utilService.loader(false);
  }

  ngOnInit() {
    console.log(pjson.version);
    this.utilService.isLoading.subscribe((isLoad: boolean) => {
      setTimeout(() => { this.loading = isLoad, 0 })
    });
  }
}
