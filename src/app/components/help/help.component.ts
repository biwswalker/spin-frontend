import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  highlight:string=null;
  highlightTrusted:SafeUrl=null;
  qrCode:string=null;
  qrCodeTrusted:SafeUrl=null;
  helpImg2:SafeUrl=null;
  helpImg3:SafeUrl=null;
  helpImg4:SafeUrl=null;
  helpImg5:SafeUrl=null;
  helpImg6:SafeUrl=null;
  helpImg7:SafeUrl=null;
  helpImg8:SafeUrl=null;
  helpImg9:SafeUrl=null;
  helpImg10:SafeUrl=null;

  constructor( private sanitizer: DomSanitizer,) { }

  ngOnInit() {
    this.highlight = './assets/img/help/221824-P1WW13-642.png';
    this.highlightTrusted = this.sanitizer.bypassSecurityTrustUrl(this.highlight);

    this.qrCode = './assets/img/help/28663.jpg';
    this.qrCodeTrusted = this.sanitizer.bypassSecurityTrustUrl(this.qrCode);
    this.helpImg2 = this.sanitizer.bypassSecurityTrustUrl("./assets/img/help/Slide2.JPG");
    this.helpImg3 = this.sanitizer.bypassSecurityTrustUrl("./assets/img/help/Slide2.JPG");
    this.helpImg4 = this.sanitizer.bypassSecurityTrustUrl("./assets/img/help/Slide2.JPG");
    this.helpImg5 = this.sanitizer.bypassSecurityTrustUrl("./assets/img/help/Slide2.JPG");
    this.helpImg6 = this.sanitizer.bypassSecurityTrustUrl("./assets/img/help/Slide2.JPG");
    this.helpImg7 = this.sanitizer.bypassSecurityTrustUrl("./assets/img/help/Slide2.JPG");
    this.helpImg8 = this.sanitizer.bypassSecurityTrustUrl("./assets/img/help/Slide2.JPG");
    this.helpImg9 = this.sanitizer.bypassSecurityTrustUrl("./assets/img/help/Slide2.JPG");
    this.helpImg10 = this.sanitizer.bypassSecurityTrustUrl("./assets/img/help/Slide2.JPG");
  }
}
