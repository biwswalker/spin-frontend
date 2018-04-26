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
                    <option *ngIf="user.userLevel === 'P' || user.userLevel === 'A'" [selected]="crrUrl === '/report/project-tag'" value="report/project-tag">การทำงานของโครงการแยกตามป้ายกำกับ</option>
                    <option *ngIf="user.userLevel === 'P' || user.userLevel === 'A'" [selected]="crrUrl === '/report/project-person'" value="report/project-person">รายงานการทำงานของโครงการแยกตามพนักงาน</option>
                    <option *ngIf="user.userLevel === 'P' || user.userLevel === 'A'" [selected]="crrUrl === '/report/unstamped'" value="report/unstamped">ผู้ที่ไม่ได้ลงเวลาทำงาน</option>
                </select>
            </div>
        </div>
    </div>
    </div>
        <router-outlet></router-outlet>

    `,
})
export class ReportComponent implements OnInit {

    public reportState = '';
    public crrUrl = '';
    public isShow = true;
    public user: User;

    constructor(private router: Router, private auth: AuthenticationService) {
    }

    async ngOnInit() {
        await this.auth.crrUser.subscribe(user => this.user = user)
        this.crrUrl = this.router.url;
        if (this.crrUrl === '/report/person') {
            this.isShow = false;
        } else {
            this.isShow = true;
            if (this.crrUrl === '/report') {
                if (this.user.userLevel === 'P') {
                    this.onChangeReport('/report/unstamped');
                } else {
                    this.onChangeReport('/report/project-tag');
                }
            }
        }
    }

    onChangeReport(value) {
        if (value) {
            this.router.navigate([value]);
        }
        return false;
    }
}
