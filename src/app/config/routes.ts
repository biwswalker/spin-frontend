import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProjectComponent } from "../components/project/project.component";
import { TimestampComponent } from "../components/timestamp/timestamp.component";

const routes: Routes = [
  { path: 'project', component: ProjectComponent },
  { path: 'timestamp', component: TimestampComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class RoutesModule { }