import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  resizedImage:string=null;
  resizedImageTrusted:SafeUrl=null;
  constructor( private sanitizer: DomSanitizer,) { }

  ngOnInit() {
    this.resizedImage = './assets/img/help/221824-P1WW13-642.png';
    this.resizedImageTrusted = this.sanitizer.bypassSecurityTrustUrl(this.resizedImage);
  }

}
