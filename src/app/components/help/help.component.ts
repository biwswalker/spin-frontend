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
  constructor( private sanitizer: DomSanitizer,) { }

  ngOnInit() {
    this.highlight = './assets/img/help/221824-P1WW13-642.png';
    this.highlightTrusted = this.sanitizer.bypassSecurityTrustUrl(this.highlight);

    this.qrCode = './assets/img/help/28663.jpg';
    this.qrCodeTrusted = this.sanitizer.bypassSecurityTrustUrl(this.qrCode);
  }

}
