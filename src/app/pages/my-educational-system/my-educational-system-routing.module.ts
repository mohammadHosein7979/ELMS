import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainClassesComponent} from "./pages/classes/main-classes/main-classes.component";
import {MainTestsComponent} from "./pages/tests/main-tests/main-tests.component";
import {MainQuestionBankComponent} from "./pages/question-bank/main-question-bank/main-question-bank.component";
import {
  MainCourseManagementComponent
} from "./pages/course-management/main-course-management/main-course-management.component";
import {
  CreateHeadlineCourseComponent
} from "./pages/course-management/pages/create-headline-course/create-headline-course.component";
import {CreateCourseComponent} from "./pages/course-management/create-course/create-course.component";
import {ListQuestionComponent} from "./pages/question-bank/list-question/list-question.component";
import {CreateQuestionComponent} from "./pages/question-bank/create-question/create-question.component";
import {ListTestsComponent} from "./pages/tests/list-tests/list-tests.component";
import {TypeTests} from "./pages/tests/services/tests.service";


const routes: Routes = [
  {path: 'classes', component: MainClassesComponent},
  // {path: 'question-bank', component: MainQuestionBankComponent},
  {
    path: 'question-bank',
    component: MainQuestionBankComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: ListQuestionComponent},
      {path: 'create', component: CreateQuestionComponent},
      { path: 'edit/:id', component: CreateQuestionComponent }
    ]
  },
  {
    path: 'tests',
    component: MainTestsComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: TypeTests.notHeld, component: ListTestsComponent},
      {path: TypeTests.uncorrected, component: ListTestsComponent},
      {path: TypeTests.completed, component: ListTestsComponent},
      // {path: 'create', component: CreateTestsComponent},
      // { path: 'edit/:id', component: CreateQuestionComponent }
    ]
  },
  {path: 'course-management', component: MainCourseManagementComponent},
  {path: 'course-management/create', component: CreateCourseComponent},
  {path: 'course-management/edit/:id', component: CreateCourseComponent},
  {path: 'course-management/create-headline-course/:id', component: CreateHeadlineCourseComponent},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class myEducationalSystemRoutingModule {
}
