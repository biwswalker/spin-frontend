import { TaskModalComponent } from './../components/attendance/task/task-modal/task-modal.component';
import { ExampleComponent } from './../components/example/example.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectComponent } from "../components/project/project.component";
import { IndexComponent } from "../components/index/index.component";
import { AttendanceComponent } from '../components/attendance/attendance.component';
import { TaskComponent } from '../components/attendance/task/task.component';
import { HolidayComponent } from '../components/admin/holiday/holiday.component';

const routes: Routes = [
  { path: '', component: AttendanceComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'task', component: TaskComponent },
  { path: 'example', component: ExampleComponent },
  { path: 'task-modal', component: TaskModalComponent },
  { path: 'holiday', component: HolidayComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesModule { }
