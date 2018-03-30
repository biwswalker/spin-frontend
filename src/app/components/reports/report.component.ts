import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../providers/authentication.service';
import { User } from '../../models/user';

@Component({
    selector: 'app-unstamped-report',
    template: `
    <div class="row">
    <div class="col-12" *ngIf="isShow">
        <div class="page-title d-flex">
        <h2 class="d-inline-block">รายงาน</h2>
            <div style="padding-left:10px;">
            <select class="form-control" name="report-page" (change)="onChangeReport($event.target.value)">
                    <option value="" disabled>กรุณาเลือกรายงาน</option>
                    <option *ngIf="user.userLevel === 'A'" [selected]="crrUrl === '/report/project-tag'" value="report/project-tag">การทำงานของโครงการ</option>
                    <option *ngIf="user.userLevel === 'P' || user.userLevel === 'A'" [selected]="crrUrl === '/report/unstamped'" value="report/unstamped">ผู้ที่ไม่ได้ลงเวลาทำงาน</option>
                </select>
            </div>
        </div>
    </div>
        <router-outlet></router-outlet>
    </div>
    `,
})
export class ReportComponent implements OnInit {

    public reportState = '';
    public crrUrl = '';
    public isShow = true;
    public user: User;

    constructor(private router: Router, private auth: AuthenticationService) {
        this.crrUrl = this.router.url;
        if (this.crrUrl === '/report/person') {
            this.isShow = false;
        } else {
            this.isShow = true;
        }
    }

    ngOnInit() {
        this.auth.crrUser.subscribe(user => this.user = user);
    }

    onChangeReport(value) {
        if (value) {
            this.router.navigate([value]);
        }
        return false;
    }
}
