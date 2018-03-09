import { UtilsService } from './../../../providers/utils/utils.service';
import { AuthenticationService } from './../../../providers/authentication.service';
import { EventService } from './../../../providers/utils/event.service';
import { ProjectService } from './../../../providers/project.service';
import { UserRegisterService } from './../../../providers/userregister.service';
import { UserRegisterSearchComponent } from './user-register-search/user-register-search.component';
import { UserRegisterInfoComponent } from './user-register-info/user-register-info.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  @ViewChild(UserRegisterInfoComponent) info;
  @ViewChild(UserRegisterSearchComponent) search;

  constructor(
    protected userRegisterService: UserRegisterService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {}

  passKeyToChildrens(userId) {
    console.log('presskey');
    this.info.ngOnInit();
    this.displayUserInfo(userId);
  }
  displayUserInfo(userId) {
    this.info.user = new User();
    this.userRegisterService.findByUserId(userId).subscribe(
      data => {
         console.log('data:',data);
        if (data) {
          this.info.user = data;
          console.log(this.info.user);
          this.info.found = 'Y';
        }else{
          this.info.found = 'N';
        }
        console.log(this.info.found);
      },
      err => {
        console.log(err);
      }
    );
  }
}
