import { EventMessagesService } from './../../../providers/utils/event-messages.service';
import { UserRegisterModalComponent } from './user-register-modal/user-register-modal.component';
import { Officer } from './../../../models/officer';
import { UtilsService } from './../../../providers/utils/utils.service';
import { AuthenticationService } from './../../../providers/authentication.service';
import { EventService } from './../../../providers/utils/event.service';
import { ProjectService } from './../../../providers/project.service';
import { UserRegisterService } from './../../../providers/userregister.service';
import { UserRegisterSearchComponent } from './user-register-search/user-register-search.component';
import { UserRegisterInfoComponent } from './user-register-info/user-register-info.component';
import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from '../../../models/user';
import { Mode } from "../../../config/properties";
import * as XLSX from "xlsx";
import { mapTo } from "rxjs/operator/mapTo";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-user-register",
  templateUrl: "./user-register.component.html",
  styleUrls: ["./user-register.component.scss"]
})
export class UserRegisterComponent {
  convertActiveFlag(activeFlag: string): boolean {
    if(activeFlag === "A"){
      return true;
    }else{
      return false;
    }
  }
  arrayBuffer: any;
  public users: User[] = [];
  message: string;
  messages: any[];
  record: number;
  file: File;
  fileName: string;
  isUpload: boolean;
  @ViewChild(UserRegisterInfoComponent) info;
  @ViewChild(UserRegisterSearchComponent) search;
  @ViewChild(UserRegisterModalComponent) userModal;

  constructor(
    protected userRegisterService: UserRegisterService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private utilsService: UtilsService,
    private eventMessageService: EventMessagesService
  ) {}

  ngAfterViewInit() {
    this.userModal.ngOnInit();
  }

  passKeyToChildrens(userId) {
    console.log("presskey: ", userId);
    this.info.ngOnInit();
    this.displayUserInfo(userId);
  }
  displayUserInfo(userId) {
    this.info.user = new User();
    this.info.userId = userId;
    this.userRegisterService.findByUserId(userId).subscribe(
      data => {
        console.log("data:", data);
        if (data) {
          this.info.user = data;
          this.userModal.isActive = this.convertActiveFlag(data.activeFlag);

          console.log(this.info.user);
          this.info.officer = new Officer();
          this.userRegisterService.findByOfficerId(data.officeId).subscribe(
            officerdata => {
              this.info.officer = officerdata;
              console.log(this.info.officer);
              this.info.found = "Y";
            },
            err => {
              console.log(err);
            }
          );
        }
        console.log(this.info.found);
      },
      err => {
        console.log(err);
      }
    );
  }

  createUserRegister() {
    this.userModal.mode = Mode.I;
    this.userModal.ngOnInit();
    console.log("mode: ", this.userModal.mode);
    this.userModal.user = new User();
    this.userRegisterService.onOpenModal();
  }

  onCloseModal() {
    this.isUpload = false;
    this.fileName = "";
    this.file = null;
  }

  clearMessage() {
    this.messages = [];
    this.message = "";
  }

  incomingfile(event) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }

  upload(){
	console.log('upload');
	let fileReader = new FileReader();
	this.record = 0;
	this.clearMessage();
	console.log(fileReader);
	fileReader.onload = (e) =>{
		console.log(fileReader.result);
		this.arrayBuffer = fileReader.result;
		var data = new Uint8Array(this.arrayBuffer);
		var arr = new Array();
		for(var i=0; i!=data.length ;++i){
			arr[i] = String.fromCharCode(data[i]);
		}
		var bstr = arr.join("");
		var workbook = XLSX.read(bstr, {type: "binary"});
		var first_sheet_name = workbook.SheetNames[0];
		var worksheet = workbook.Sheets[first_sheet_name];
		this.record = XLSX.utils.sheet_to_json(worksheet,{header:2}).length;
		console.log('record =', this.record);
		let obj = [];
		obj = XLSX.utils.sheet_to_json(worksheet,{header:2});
		this.convertData(obj).then(
		data => {
			data.subscribe(
				result => {
					console.log(result);
					this.getMessage();
				}
      )
    }
    )
	}
	fileReader.readAsArrayBuffer(this.file);
  }

    async convertData(obj){
	let result = [];
	await obj.forEach(
		element => {
			result.push(this.mapData(element));
		}
	);
	console.log(result);
	console.log(this.users);
	return await Observable.forkJoin(result);
  }

  mapData(obj): Observable<any>{
	let user = new User();
	let officeId = obj['รหัสพนักงาน'];
	let email = obj['E-mail'];
	let userLevel = 'U';
	let remark = '';
  let activeFlag = 'A';
  console.log("email:"+email);
  console.log(">>>>" + obj["E-mail"]);
	let userId =  email.split('@')[0];

	return this.userRegisterService.getDataObservable(officeId).map(
		data => {
			if(!data){
				this.messages[0] = "ไม่พบข้อมูลพนักงานในฐานข้อมูล";
			}

			user.officeId = officeId;
			user.email = email;
			user.userId = userId;
			user.userLevel = userLevel;
			user.remark = remark;
			user.activeFlag = activeFlag;

			this.users = this.users.concat(user);
			return user
		}
	);
  }

   getMessage(){
    console.log(this.users);
    console.log(this.messages.length);
    if(this.message.length > 1){
		this.isUpload = false;
		this.message = "พบข้อมูลไม่สมบูรณ์ ".concat(this.messages.toString());
	}else{
		this.isUpload = true;
		this.userRegisterService.uploadExcel(this.users).subscribe(
			data => {
				console.log(data);
				this.eventMessageService.onInsertSuccess(null);
				this.clearMessage();
			},
			error => {
				this.eventMessageService.onInsertError(error);
				this.clearMessage();
			}
		);
	}
  }

}
