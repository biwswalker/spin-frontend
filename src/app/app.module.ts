// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive, Input, Output, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { NgxPopperModule } from 'ngx-popper';
import { BsDropdownModule } from 'ngx-bootstrap';

// config
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './config/interceptor';
import { RoutesModule } from './config/routes';

// component
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectModalComponent } from './components/project/project-modal/project-modal.component';
import { ProjectModalDetailComponent } from './components/project/project-modal/detail/project-modal-detail.component';
import { ProjectModalPhaseComponent } from './components/project/project-modal/phase/project-modal-phase.component';
import { ProjectModalMemberComponent } from './components/project/project-modal/member/project-modal-member.component';
import { ExampleComponent } from './components/example/example.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { TimestampComponent } from './components/attendance/timestamp/timestamp.component';
import { TaskComponent } from './components/attendance/task/task.component';
import { TaskModalComponent } from './components/attendance/task/task-modal/task-modal.component';
import { TimetableDayComponent } from './components/attendance/timestamp/timetable-day/timetable-day.component';
import { TimetableWeekComponent } from './components/attendance/timestamp/timetable-week/timetable-week.component';
import { TaskDayComponent } from './components/attendance/task/task-day/task-day.component';
import { TaskAllComponent } from './components/attendance/task/task-all/task-all.component';
import { ProjectSearchComponent } from './components/project/project-search/project-search.component';
import { TaskDetailComponent } from './components/attendance/task/task-modal/task-detail/task-detail.component';
import { TaskPartnerComponent } from './components/attendance/task/task-modal/task-partner/task-partner.component';
import { TaskTagComponent } from './components/attendance/task/task-modal/task-tag/task-tag.component';
import { PrjInfoDetailComponent } from './components/project/project-info/prj-info-detail/prj-info-detail.component';
import { PrjInfoMemberComponent } from './components/project/project-info/prj-info-member/prj-info-member.component';
import { TaskDirective } from './components/attendance/task/task/task.component';
import { ProjectInfoComponent } from './components/project/project-info/project-info.component';
import { PrjInfoSummaryComponent } from './components/project/project-info/prj-info-summary/prj-info-summary.component';
import { HolidayComponent } from './components/admin/holiday/holiday.component';
import { HolidayInfoComponent } from './components/admin/holiday/holiday-info/holiday-info.component';
import { HolidayProcessComponent } from './components/admin/holiday/holiday-process/holiday-process.component';
import { ResponsibilityComponent } from './components/admin/responsibility/responsibility.component';
import { ResponsibilityInfoComponent } from './components/admin/responsibility/responsibility-info/responsibility-info.component';
import { ResponsibilitySearchComponent } from './components/admin/responsibility/responsibility-search/responsibility-search.component';
import { ResponsibilityModalComponent } from './components/admin/responsibility/responsibility-modal/responsibility-modal.component';


// service
import { HttpRequestService } from './providers/utils/http-request.service';
import { ProjectService } from './providers/project.service';
import { EventService } from './providers/utils/event.service';
import { AuthenticationService } from './providers/authentication.service';
import { TaskService } from './providers/task.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UtilsService } from './providers/utils/utils.service';
import { TagService } from './providers/tag.service';
import { PartnerService } from './providers/partner.service';
import { OfficerService } from './providers/officer.service';
import { HttpModule } from '@angular/http';
import { ResponsibilityService } from './providers/responsibility.service';
import { HolidayService } from './providers/holiday.service';
import { LeaveService } from './providers/leave.service';
import { EventMessagesService } from './providers/utils/event-messages.service';
import { UserRegisterService } from './providers/userregister.service';


// Pipe
import { ThaiDatePipe } from './pipes/thai-date.pipe';
import { ProjectNamePipe } from './pipes/project-name.pipe';
import { TimePipe } from './pipes/time.pipe';

// Directive
import { DatePickerDirective } from './directives/datepicker';
import { UserRegisterComponent } from './components/admin/user-register/user-register.component';
import { UserRegisterInfoComponent } from './components/admin/user-register/user-register-info/user-register-info.component';
import { UserRegisterSearchComponent } from './components/admin/user-register/user-register-search/user-register-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    ProjectComponent,
    TimestampComponent,
    ProjectModalComponent,
    ProjectModalDetailComponent,
    ProjectModalPhaseComponent,
    ProjectModalMemberComponent,
    TaskComponent,
    TaskModalComponent,
    ExampleComponent,
    AttendanceComponent,
    TimetableDayComponent,
    TimetableWeekComponent,
    TaskDayComponent,
    TaskAllComponent,
    ProjectSearchComponent,
    TaskDetailComponent,
    TaskPartnerComponent,
    TaskTagComponent,
    ProjectInfoComponent,
    TaskDirective,
    PrjInfoDetailComponent,
    PrjInfoMemberComponent,
    PrjInfoSummaryComponent,
    ThaiDatePipe,
    ProjectNamePipe,
    TimePipe,
    DatePickerDirective,
    HolidayComponent,
    HolidayInfoComponent,
    HolidayProcessComponent,
    ResponsibilityComponent,
    ResponsibilityInfoComponent,
    ResponsibilitySearchComponent,
    UserRegisterComponent,
    UserRegisterInfoComponent,
    UserRegisterSearchComponent,
    ResponsibilityModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutesModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TagInputModule,
    BrowserAnimationsModule,
    NguiAutoCompleteModule,
    InfiniteScrollModule,
    TypeaheadModule.forRoot(),
    Ng2ImgToolsModule,
    NgxPopperModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    HttpRequestService,
    EventService,
    ProjectService,
    AuthenticationService,
    TaskService,
    UtilsService,
    PartnerService,
    TagService,
    OfficerService,
    ResponsibilityService,
    HolidayService,
    LeaveService,
    EventMessagesService,
    UserRegisterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

