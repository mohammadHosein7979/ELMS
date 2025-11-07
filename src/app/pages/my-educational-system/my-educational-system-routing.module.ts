import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainClassesComponent} from "./pages/classes/main-classes/main-classes.component";
import {MainTestsComponent} from "./pages/tests/main-tests/main-tests.component";
import {MainQuestionBankComponent} from "./pages/question-bank/main-question-bank/main-question-bank.component";
import {
  MainCourseManagementComponent
} from "./pages/course-management/main-course-management/main-course-management.component";


const routes: Routes = [
      {path: 'classes', component: MainClassesComponent},
      {path: 'tests', component: MainTestsComponent},
      {path: 'question-bank', component: MainQuestionBankComponent},
      {path: 'course-management', component: MainCourseManagementComponent},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class myEducationalSystemRoutingModule { }
