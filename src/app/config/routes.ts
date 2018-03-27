import { HelpComponent } from './../components/help/help.component';
import { ChangePasswordComponent } from './../components/change-password/change-password.component';
import { TaskModalComponent } from './../components/attendance/task/task-modal/task-modal.component';
import { ExampleComponent } from './../components/example/example.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from '../components/project/project.component';
import { IndexComponent } from '../components/index/index.component';
import { AttendanceComponent } from '../components/attendance/attendance.component';
import { TaskComponent } from '../components/attendance/task/task.component';
import { HolidayComponent } from '../components/admin/holiday/holiday.component';
import { ResponsibilityComponent } from '../components/admin/responsibility/responsibility.component';
import { UserRegisterComponent } from '../components/admin/user-register/user-register.component';
import { OfficerComponent } from './../components/admin/officer/officer.component';
import { DepartmentComponent } from '../components/admin/department/department.component';
import { PositionComponent } from '../components/admin/position/position.component';
<<<<<<< HEAD
import { ReportPersonComponent } from '../components/report/report-person/report-person.component';
=======
import { ReportComponent } from '../components/reports/report.component';
import { UnstampedReportComponent } from '../components/reports/unstamped-report/unstamped-report.component';
>>>>>>> 4d18ea0d7247075859a1dee6f77c982a9b108567

const routes: Routes = [
  { path: '', component: AttendanceComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'task', component: TaskComponent },
  { path: 'example', component: ExampleComponent },
  { path: 'task-modal', component: TaskModalComponent },
  { path: 'holiday', component: HolidayComponent },
  { path: 'responsibility', component: ResponsibilityComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'officer', component: OfficerComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'position', component: PositionComponent },
  { path: 'help', component: HelpComponent },
<<<<<<< HEAD
  { path: 'report-person', component: ReportPersonComponent}
=======
  { path: 'report', component: ReportComponent, children: [{ path: 'unstamped', component: UnstampedReportComponent }] }
>>>>>>> 4d18ea0d7247075859a1dee6f77c982a9b108567
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesModule { }
