import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainEducationComponent} from "./main-education/main-education.component";


const routes: Routes = [
      {path: '', component: MainEducationComponent},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class educationRoutingModule { }
