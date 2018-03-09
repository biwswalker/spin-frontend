import { User } from './../../../../models/user';
import { Component, OnInit } from '@angular/core';
import { UserRegisterService } from '../../../../providers/userregister.service';

@Component({
  selector: 'app-user-register-info',
  templateUrl: './user-register-info.component.html',
  styleUrls: ['./user-register-info.component.scss']
})
export class UserRegisterInfoComponent implements OnInit {
  public user: User = new User();
  public userId: string;
  public found: string;
  constructor(
    private userRegisterService: UserRegisterService,
  ){}

  ngOnInit() {
  }
}
