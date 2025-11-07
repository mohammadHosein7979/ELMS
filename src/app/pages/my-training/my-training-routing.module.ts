import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainCoursesComponent} from "./pages/courses/main-courses/main-courses.component";
import {MainRecordsComponent} from "./pages/records/main-records/main-records.component";
import {MainRoadmapComponent} from "./pages/roadmap/main-roadmap/main-roadmap.component";


const routes: Routes = [
      {path: 'courses', component: MainCoursesComponent},
      {path: 'records', component: MainRecordsComponent},
      {path: 'roadmap', component: MainRoadmapComponent},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class myTrainingRoutingModule { }
