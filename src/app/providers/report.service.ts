import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

@Injectable()
export class ReportService {

  constructor(private request: HttpRequestService) { }

  openReport() {
    var tabWindow = window.open('about:blank', '_blank');
    tabWindow.location.href = 'report';

    // this.request.requestMethodGET('').toPromise().then(res => {
    //   // tabWindow.location.href = res.headers(res);

    //   var newBlob = new Blob([res], { type: "application/pdf" })
    //   // IE doesn't allow using a blob object directly as link href
    //   // instead it is necessary to use msSaveOrOpenBlob
    //   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //     window.navigator.msSaveOrOpenBlob(newBlob);
    //     return;
    //   }
    //   // For other browsers: 
    //   // Create a link pointing to the ObjectURL containing the blob.
    //   const data = window.URL.createObjectURL(newBlob);
    //   var link = document.createElement('a');
    //   link.href = data;
    //   link.download = "report.pdf";
    //   link.click();

    //   setTimeout(() => {
    //     window.URL.revokeObjectURL(data);
    //   }, 100);
    // });
  }
}
