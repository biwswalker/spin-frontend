import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectComponent } from "../components/project/project.component";
import { TaskComponent } from "../components/task/task.component";
import { IndexComponent } from "../components/index/index.component";

const routes: Routes = [
  { path: 'project', component: ProjectComponent},
  { path: 'task', component: TaskComponent},
  { path: 'example', component: IndexComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class RoutesModule { }
