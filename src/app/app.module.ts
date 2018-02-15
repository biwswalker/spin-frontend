// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// config
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './config/interceptor';
import { RoutesModule } from './config/routes';

// component
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { ProjectComponent } from './components/project/project.component';
import { TimestampComponent } from './components/timestamp/timestamp.component';
import { ProjectModalComponent } from './components/project/project-modal/project-modal.component';
import { ProjectModalDetailComponent } from './components/project/project-modal/detail/project-modal-detail.component';
import { ProjectModalPhaseComponent } from './components/project/project-modal/phase/project-modal-phase.component';
import { ProjectModalMemberComponent } from './components/project/project-modal/member/project-modal-member.component';
import { TaskComponent } from './components/task/task.component';
import { TaskModalComponent } from './components/task/task-modal/task-modal.component';


// service
import { HttpRequestService } from './providers/utils/http-request.service';
import { ProjectService } from './providers/project.service';
import { EventService } from './providers/event.service';
import { ExampleComponent } from './components/index/example/example.component';
import { ComponentExampleComponent } from './components/index/component-example/component-example.component';


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
    IndexComponent,
    ExampleComponent,
    ComponentExampleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutesModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    HttpRequestService,
    EventService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
