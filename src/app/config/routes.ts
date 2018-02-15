import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from "../components/index/index.component";
import { ProjectComponent } from "../components/project/project.component";
const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },

  { path: 'project', component: ProjectComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class RoutesModule { }
