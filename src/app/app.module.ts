// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { NgxPopperModule } from 'ngx-popper';
import { BsDropdownModule, TypeaheadModule } from 'ngx-bootstrap';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgSelectModule } from '@ng-select/ng-select';
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
import { ResponsibilityComponent } from './components/admin/responsibility/responsibility.component';
import { ResponsibilityInfoComponent } from './components/admin/responsibility/responsibility-info/responsibility-info.component';
import { ResponsibilitySearchComponent } from './components/admin/responsibility/responsibility-search/responsibility-search.component';
import { ResponsibilityModalComponent } from './components/admin/responsibility/responsibility-modal/responsibility-modal.component';
import { UserRegisterComponent } from "./components/admin/user-register/user-register.component";
import { UserRegisterInfoComponent } from "./components/admin/user-register/user-register-info/user-register-info.component";
import { UserRegisterSearchComponent } from "./components/admin/user-register/user-register-search/user-register-search.component";
import { OfficerComponent } from './components/admin/officer/officer.component';
import { OfficerSearchComponent } from './components/admin/officer/officer-search/officer-search.component';
import { OfficerInfoComponent } from './components/admin/officer/officer-info/officer-info.component';
import { OfficerModalComponent } from './components/admin/officer/officer-modal/officer-modal.component';
import { UserRegisterModalComponent } from './components/admin/user-register/user-register-modal/user-register-modal.component';
import { HolidaySearchComponent } from './components/admin/holiday/holiday-search/holiday-search.component';
import { HolidayModalComponent } from './components/admin/holiday/holiday-modal/holiday-modal.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DepartmentComponent } from './components/admin/department/department.component';
import { DepartmentInfoComponent } from './components/admin/department/department-info/department-info.component';
import { DepartmentModalComponent } from './components/admin/department/department-modal/department-modal.component';
import { DepartmentSearchComponent } from './components/admin/department/department-search/department-search.component';
import { PositionComponent } from './components/admin/position/position.component';
import { PositionInfoComponent } from './components/admin/position/position-info/position-info.component';
import { PositionModalComponent } from './components/admin/position/position-modal/position-modal.component';
import { PositionSearchComponent } from './components/admin/position/position-search/position-search.component';
import { PersonReportComponent } from './components/reports/person-report/person-report.component'
import { HelpComponent } from './components/help/help.component';
import { UnstampedReportComponent } from './components/reports/unstamped-report/unstamped-report.component';
import { ReportComponent } from './components/reports/report.component';
import { ProjectTagReportComponent } from './components/reports/project-tag-report/project-tag-report.component';
import { ByProjectComponent } from './components/reports/person-report/by-project/by-project.component';
import { ByTagComponent } from './components/reports/person-report/by-tag/by-tag.component';
import { ByDateComponent } from './components/reports/person-report/by-date/by-date.component';
import { TagComponent } from './components/admin/tag/tag.component';
import { TagInfoComponent } from './components/admin/tag/tag-info/tag-info.component';
import { TagSearchComponent } from './components/admin/tag/tag-search/tag-search.component';
import { TagModalComponent } from './components/admin/tag/tag-modal/tag-modal.component';

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
import { DepartmentService } from './providers/department.service';
import { PositionService } from './providers/position.service';
import { ReportService } from './providers/report.service';
import { Initializer } from './config/initializer';

// Pipe
import { ThaiDatePipe } from './pipes/thai-date.pipe';
import { ProjectNamePipe } from './pipes/project-name.pipe';
import { TimePipe } from './pipes/time.pipe';

// Directive
import { DatePickerDirective } from './directives/datepicker';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DisableControlDirective } from './directives/DisableControlDirective';



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
    ResponsibilityComponent,
    ResponsibilityInfoComponent,
    ResponsibilitySearchComponent,
    ResponsibilityModalComponent,
    UserRegisterComponent,
    UserRegisterInfoComponent,
    UserRegisterSearchComponent,
    OfficerComponent,
    OfficerSearchComponent,
    OfficerInfoComponent,
    OfficerModalComponent,
    UserRegisterModalComponent,
    HolidaySearchComponent,
    HolidayModalComponent,
    ChangePasswordComponent,
    DepartmentComponent,
    DepartmentInfoComponent,
    DepartmentModalComponent,
    DepartmentSearchComponent,
    PositionComponent,
    PositionInfoComponent,
    PositionModalComponent,
    PositionSearchComponent,
    HelpComponent,
    PersonReportComponent,
    UnstampedReportComponent,
    ReportComponent,
    ProjectTagReportComponent,
    ByProjectComponent,
    ByTagComponent,
    ByDateComponent,
    TagComponent,
    TagInfoComponent,
    TagSearchComponent,
    TagModalComponent,
    DisableControlDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutesModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    TypeaheadModule.forRoot(),
    Ng2ImgToolsModule,
    NgxPopperModule,
    BsDropdownModule.forRoot(),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.chasingDots,
      fullScreenBackdrop: true,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      primaryColour: '#dc3545',
      secondaryColour: '#28a745',
      tertiaryColour: '#ffc107'
    }),
    NgSelectModule,
    PdfViewerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: (initial: Initializer) => () => initial.load(), deps: [Initializer], multi: true },
    Initializer,
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
    DepartmentService,
    PositionService,
    ReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
