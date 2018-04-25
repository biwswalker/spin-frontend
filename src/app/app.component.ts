import { Component, NgZone, OnInit } from '@angular/core';
import { AuthenticationService } from './providers/authentication.service';
import { UtilsService } from './providers/utils/utils.service';
import { Status } from './config/properties';
import { Router, ActivatedRoute } from '@angular/router';
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
  private currentUrl;

  constructor(private router: Router,private route: ActivatedRoute, private authService: AuthenticationService, private utilService: UtilsService) {
    // const url = localStorage.getItem('currentUrl');
    this.currentUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authService.crrAccess.subscribe(accesses => {
      // console.log('accesses: ',accesses)
      // console.log('url: ',url)
      
      if (accesses) {
        this.isAccess = true;
        this.router.navigateByUrl(this.currentUrl);
        // if(url){
        //   this.router.navigate([url]);
        // }else{
        //   this.router.navigate(['/attendance']);
        // }

      } else {
        this.router.dispose();
        this.isAccess = false;
      }
    })
  }

  ngOnInit() {
    this.utilService.isLoading.subscribe((isLoad: boolean) => {
      setTimeout(() => { this.loading = isLoad, 0 })
    });
  }
}
