import { ExampleComponent } from './../components/index/example/example.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectComponent } from "../components/project/project.component";
import { IndexComponent } from "../components/index/index.component";
import { AttendanceComponent } from '../components/attendance/attendance.component';
import { TaskComponent } from '../components/attendance/task/task.component';

const routes: Routes = [
  { path: 'project', component: ProjectComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'task', component: TaskComponent },
  { path: 'example', component: ExampleComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesModule { }
