import { Component, NgZone, OnInit } from '@angular/core';
import { AuthenticationService } from './providers/authentication.service';
import { UtilsService } from './providers/utils/utils.service';
import { Status } from './config/properties';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public loading = false;
  public isAccess = false;
  private isRequested = false;

  constructor(private authService: AuthenticationService, private utilService: UtilsService) {
    this.authService.crrAccess.subscribe(async accesses => {
      if (accesses) {
        this.isAccess = true;
      }else{
        this.isAccess = false;
      }
      // if (this.authService.isInSession()) {
      //   let status = await this.authService.accessUser();
      //   if (status === Status.SUCCESS) {
      //     this.isAccess = true;
      //   } else {
      //     this.isAccess = false;
      //   }
      //   $('#task-modal').on("hidden.bs.modal");
      //   $('#project-modal').on("hidden.bs.modal");
      // } else {
      //   this.isAccess = false;
      // }

    })
  }

  ngOnInit() {
    this.utilService.isLoading.subscribe((isLoad: boolean) => {
      setTimeout(() => { this.loading = isLoad, 0 })
    });
  }
}
