import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import { DetailEducationComponent } from './pages/detail-education/detail-education.component';


const routes: Routes = [
      {path: '', component: HomePageComponent},
      {path: 'course/detail/:id', component: DetailEducationComponent},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class landingRoutingModule { }
