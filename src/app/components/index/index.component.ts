import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../../providers/authentication.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {



  public user: User = new User();
  public fullname = '';
  public email = '';
  public currentUrl:string = '';
  public worktimeIcon;
  public worktimeIconBlack = "./assets/img/ico/black/b-worktime.png";
  public worktimeIconWhite = "./assets/img/ico/white/w-worktime.png";
  public worktimeIconRed = "./assets/img/ico/red/r-worktime.png";

  public projectIcon;
  public projectIconBlack = "./assets/img/ico/black/b-project.png";
  public projectIconWhite = "./assets/img/ico/white/w-project.png";
  public projectIconRed = "./assets/img/ico/red/r-project.png";

  public leaveIcon;
  public leaveIconBlack = "./assets/img/ico/black/b-leave.png";
  public leaveIconWhite = "./assets/img/ico/white/w-leave.png";
  public leaveIconRed = "./assets/img/ico/red/r-leave.png";

  public inoutIcon;
  public inoutIconBlack = "./assets/img/ico/black/b-inout.png";
  public inoutIconWhite = "./assets/img/ico/white/w-inout.png";
  public inoutIconRed = "./assets/img/ico/red/r-inout.png";

  public newsIcon;
  public newsIconBlack = "./assets/img/ico/black/b-news.png";
  public newsIconWhite = "./assets/img/ico/white/w-news.png";
  public newsIconRed = "./assets/img/ico/red/r-news.png";

  public adminIcon;
  public adminIconBlack = "./assets/img/ico/black/b-admin.png";
  public adminIconWhite = "./assets/img/ico/white/w-admin.png";
  public adminIconRed = "./assets/img/ico/red/r-admin.png";


  constructor(private authService: AuthenticationService,private router: Router) {
    this.authService.crrUser.subscribe((user: User) => {
      this.user = user;
      if (this.user.email) {
        this.email = this.user.email;
      }
      if (this.user.officer) {
        this.fullname = `${this.user.officer.firstNameEn} ${this.user.officer.lastNameEn}`;
      }
    });


  }

 async  ngOnInit() {
  this.onChangeRoute();
      this.router.events.subscribe((val) => {
      if(val['url']){
        this.currentUrl = val['url'];
        this.onChangeRoute();
      }
  })

  }

  onChangeRoute(){
    this.worktimeIcon = (this.currentUrl =='/attendance'?this.worktimeIconWhite:this.worktimeIconBlack);
    this.projectIcon = (this.currentUrl =='/project'?this.projectIconWhite:this.projectIconBlack);
    this.leaveIcon = this.leaveIconRed;
    this.inoutIcon = this.inoutIconRed;
    this.newsIcon = this.newsIconRed;
    this.adminIcon = this.adminIconBlack;
  }

  onMouseOver(index){

    if(index == 0)
    this.worktimeIcon = this.worktimeIconWhite;
    if(index == 1)
    this.projectIcon = this.projectIconWhite;
    if(index == 2)
    this.leaveIcon = this.leaveIconWhite;
    if(index == 3)
    this.inoutIcon = this.inoutIconWhite;
    if(index == 4)
    this.newsIcon = this.newsIconWhite;
    if(index == 5)
    this.adminIcon = this.adminIconWhite;
  }
  onMouseLeave(){
    this.onChangeRoute();
  }
  ngOnDestroy() {
    this.user = new User();
    this.fullname = '';
    this.email = '';
  }

  logout() {
    this.authService.logout();
  }

}
