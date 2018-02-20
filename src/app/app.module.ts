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
import { TimetableComponent } from './components/attendance/timestamp/timetable/timetable.component';
import { TaskComponent } from './components/attendance/task/task.component';
import { TaskModalComponent } from './components/attendance/task/task-modal/task-modal.component';
import { TimetableDayComponent } from './components/attendance/timestamp/timetable-day/timetable-day.component';
import { TimetableWeekComponent } from './components/attendance/timestamp/timetable-week/timetable-week.component';
import { TaskDayComponent } from './components/attendance/task/task-day/task-day.component';
import { TaskAllComponent } from './components/attendance/task/task-all/task-all.component';

// service
import { HttpRequestService } from './providers/utils/http-request.service';
import { ProjectService } from './providers/project.service';
import { EventService } from './providers/utils/event.service';
import { AuthenticationService } from './providers/authentication.service';

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
    TimetableComponent,
    TaskComponent,
    TaskModalComponent,
    IndexComponent,
    ExampleComponent,
    ComponentExampleComponent,
    AttendanceComponent,
    TimetableDayComponent,
    TimetableWeekComponent,
    TaskDayComponent,
    TaskAllComponent,
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
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
