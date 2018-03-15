import { Mode } from './../../../config/properties';
import { Observable } from 'rxjs/Observable';
import { EventMessagesService } from './../../../providers/utils/event-messages.service';
import { Officer } from './../../../models/officer';
import { OfficerService } from './../../../providers/officer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OfficerInfoComponent } from './officer-info/officer-info.component';
import { OfficerSearchComponent } from './officer-search/officer-search.component';
import { OfficerModalComponent } from './officer-modal/officer-modal.component';
import * as XLSX from 'ts-xlsx';
import { mapTo } from 'rxjs/operator/mapTo';

@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.scss']
})
export class OfficerComponent implements OnInit {

  @ViewChild(OfficerInfoComponent) officerInfo;
  @ViewChild(OfficerSearchComponent) officerSearch;
  @ViewChild(OfficerModalComponent) officerModal;

  public officeId: string;
  public record: number = 0;
  public isUpload: boolean = false;
  public fileName: any;

  public officers: Officer[] = [];

  public messages: string[] = [];
  public messagesDepartment: string[] = [];
  public messagesPosition: string[] = [];
  public message: string = '';


  arrayBuffer: any;
  file: File;

  constructor(private officerService: OfficerService, private eventMessagesService: EventMessagesService) { }

  ngOnInit() {
  }

  getData(key) {
    console.log('key = ' + key);
    this.officeId = key;
    this.getOfficerInfo();
  }

  getOfficerInfo() {
    console.log('this.officerId = ' + this.officeId);
    this.officerService.findByOfficeId(this.officeId).subscribe(
      res => {
        this.officerInfo.officer = res;
      }
    );
  }

  incomingfile(event) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }

  Upload() {
    console.log('upload');
    let fileReader = new FileReader();
    this.record = 0;
    this.clearMessage();
    console.log(fileReader);
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.record = XLSX.utils.sheet_to_json(worksheet, { header: 2 }).length;
      console.log('record = ', this.record);
      let obj = []
      obj = XLSX.utils.sheet_to_json(worksheet, { header: 2 });
      let officerResult;
      this.convertData(obj).then(
        data => {
          data.subscribe(
            result => {
              console.log(result);
              //   this.officers2 = result;
              this.messages = this.messagesDepartment.concat(this.messagesPosition);
              console.log(this.messages);
              this.getMessage();
            }
          )
          console.log(this.officers);
        }
      )

    }
    fileReader.readAsArrayBuffer(this.file);
  }

  async convertData(obj) {
    let result = []
    await obj.forEach(element => {
      result.push(this.mapData(element));
    });
    console.log(result);
    console.log(this.officers);
    return await Observable.forkJoin(result);
  }

  mapData(obj): Observable<any> {

    let officer = new Officer();
    //หน่วยงาน
    let deptAbbr = obj['หน่วยงาน'];

    //ตำแหน่ง
    let positionAbbr = obj['ตำแหน่ง'];

    //รหัสพนักงาน
    let officeId = obj['รหัสพนักงาน'];
    //คำนำหน้าชื่อ
    let titleTh = obj['คำนำหน้าชื่อ'];

    //ชื่อไทย
    var regex = new RegExp("\\s{1,3}");
    let nameThRegex = obj['ชื่อไทย'].trim().replace(regex, ",");
    let nameTh = nameThRegex.split(",")

    //ชื่ออังกฤษ
    let nameEnRegex = obj['ชื่ออังกฤษ'].trim().replace(regex, ",");
    let nameEn = nameEnRegex.split(",")

    //วันที่เข้างาน
    let date = obj['วันที่เข้างาน'].split("/");
    let startdate = (Number.parseInt(date[2]) + 543) + date[1] + ("0" + (date[0])).slice(-2);

    //E-mail
    let email = obj['E-mail'];

    //  console.log('email ', email);
    return this.officerService.getDataObservable(deptAbbr, positionAbbr)
      .map(
        data => {
          //   console.log('map');
          if (data[0]) {
            officer.deptId = data[0].deptId;
          } else {
            if (this.messagesDepartment.length === 0) {
              this.messagesDepartment = this.messagesDepartment.concat('ชื่อแผนกดังต่อไปนี้ ไม่พบในฐานข้อมูล ');
            } else {
              this.messagesDepartment = this.messagesDepartment.concat(deptAbbr);
            }
          }
          if (data[1]) {
            officer.positionId = data[1].positionId;
          } else {
            if (this.messagesPosition.length === 0) {
              this.messagesPosition = this.messagesPosition.concat('ชื่อตำแหน่งดังต่อไปนี้ ไม่พบในฐานข้อมูล');
            } else {
              this.messagesPosition = this.messagesPosition.concat(positionAbbr);
            }
          }

          //รหัสพนักงาน
          officer.officeId = officeId

          //คำนำหน้าชื่อ
          officer.titleTh = titleTh;

          //ชื่อไทย
          officer.firstNameTh = nameTh[0];
          officer.lastNameTh = nameTh[1];

          //ชื่ออังกฤษ
          officer.firstNameEn = nameEn[0];
          officer.lastNameEn = nameEn[1];

          //วันที่เข้างาน
          officer.startDate = startdate;

          //E-mail
          officer.email = email;

          this.officers = this.officers.concat(officer);
          return officer;
        }
      );
  }

  onCloseModal() {
    this.isUpload = false;
    this.fileName = '';
    this.file = null;
  }

  createOfficer() {
    this.officerModal.mode = Mode.I;
    this.officerModal.officer = new Officer();
    this.officerModal.ngOnInit();
    this.officerService.onOpenModal();
  }


  getMessage() {
    console.log("this.officers = ", this.officers);
    console.log("this.messages = ", this.messages.length);
    if (this.messages.length > 1) {
      this.isUpload = false;
      this.message = 'พบข้อมูลไม่สมบูรณ์ '.concat(this.messages.toString());
      console.log("==============if================");
      //    this.eventMessagesService.onUploadError(this.messages)
      //print message
    } else {
      this.isUpload = true;
      console.log("==============else================");
      //import data
      this.officerService.uploadExcel(this.officers).subscribe(
        data => {
          console.log(data);
          this.eventMessagesService.onInsertSuccess(null);
          this.clearMessage();
        },
        error => {
          this.eventMessagesService.onInsertError(error);
          this.clearMessage();
        }
      );
    }
  }

  onCheckState(key) {
    console.log('onCheckState = ' + key);
    if (key) {
      this.officerSearch.ngOnInit();
    }
  }

  clearMessage() {
    this.messages = [];
    this.messagesDepartment = [];
    this.messagesPosition = [];
    this.message = '';
  }

}
