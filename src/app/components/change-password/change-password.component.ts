import { UtilsService } from './../../providers/utils/utils.service';
import { User } from './../../models/user';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from './../../providers/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public user: User = new User;
  public oldPassword: string;
  public newPassword1:string;
  public newPassword2:string;
  public formGroup:FormGroup;
  constructor(private authService: AuthenticationService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.validateForm();
    this.authService.crrUser.subscribe(user=>{
      console.log('this.user: ',user)
      this.user = user;
      },
      err=>{
        console.log(err);
      }
    );
  }
  validateForm(){
    this.formGroup = new FormGroup({
      userId: new FormControl(''),
      oldPassword: new FormControl(this.oldPassword, Validators.required),
      newPassword1: new FormControl(this.newPassword1, Validators.required),
      newPassword2: new FormControl(this.newPassword2, Validators.required),

    })
  }

  onSubmit(){
    console.log('date: ',this.formGroup.value);
    this.utilsService.findInvalidControls(this.formGroup);
    if(this.formGroup.valid){

    }
  }

}
