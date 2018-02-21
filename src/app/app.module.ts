// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';

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
import { ExampleComponent } from './components/index/example/example.component';
import { ComponentExampleComponent } from './components/index/component-example/component-example.component';
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
import { TaskMemberComponent } from './components/attendance/task/task-modal/task-member/task-member.component';
import { TaskTagComponent } from './components/attendance/task/task-modal/task-tag/task-tag.component';
import { PrjInfoDetailComponent } from './components/project/project-info/prj-info-detail/prj-info-detail.component';
import { PrjInfoMemberComponent } from './components/project/project-info/prj-info-member/prj-info-member.component';
import { TaskDirective } from './components/attendance/task/task/task.component';
import { ProjectInfoComponent } from './components/project/project-info/project-info.component';
import { PrjInfoSummaryComponent } from './components/project/project-info/prj-info-summary/prj-info-summary.component';

// service
import { HttpRequestService } from './providers/utils/http-request.service';
import { ProjectService } from './providers/project.service';
import { EventService } from './providers/utils/event.service';
import { AuthenticationService } from './providers/authentication.service';
import { TaskService } from './providers/task.service';

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
    ComponentExampleComponent,
    AttendanceComponent,
    TimetableDayComponent,
    TimetableWeekComponent,
    TaskDayComponent,
    TaskAllComponent,
    ProjectSearchComponent,
    TaskDetailComponent,
    TaskMemberComponent,
    TaskTagComponent,
    ProjectInfoComponent,
    TaskDirective,
    PrjInfoDetailComponent,
    PrjInfoMemberComponent,
    PrjInfoSummaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutesModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TagInputModule, BrowserAnimationsModule
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
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
