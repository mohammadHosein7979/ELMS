import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {myEducationalSystemRoutingModule} from "./my-educational-system-routing.module";
import {CommonModule} from "@angular/common";
import {SwiperModule} from "swiper/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {MainClassesComponent} from "./pages/classes/main-classes/main-classes.component";
import {CardClassesComponent} from "./pages/classes/components/card-classes/card-classes.component";
import { MainTestsComponent } from './pages/tests/main-tests/main-tests.component';
import {CardTestsNotHeldComponent} from "./pages/tests/components/card-tests-not-held/card-tests-not-held.component";
import {
  CardTestsUncorrectedComponent
} from "./pages/tests/components/card-tests-uncorrected/card-tests-uncorrected.component";
import {
    CardTestsCompletedComponent
} from "./pages/tests/components/card-tests-completed/card-tests-completed.component";
import {CardQuestionComponent} from "./pages/question-bank/components/card-question/card-question.component";
import {
  ListQuestionComponent
} from "./pages/question-bank/list-question/list-question.component";
import { CreateQuestionComponent } from './pages/question-bank/create-question/create-question.component';
import { MainQuestionBankComponent } from './pages/question-bank/main-question-bank/main-question-bank.component';
import {NzAutocompleteComponent, NzAutocompleteTriggerDirective} from "ng-zorro-antd/auto-complete";
import {ProgressCircleComponent} from "../../components/progress-circle/progress-circle.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { MainCourseManagementComponent } from './pages/course-management/main-course-management/main-course-management.component';
import {CreateCourseComponent} from "./pages/course-management/create-course/create-course.component";
import {
  TypeSelectedCourseComponent
} from "./pages/course-management/components/type-selected-course/type-selected-course.component";

@NgModule({
  declarations: [
    MainClassesComponent,
    MainTestsComponent,
    ListQuestionComponent,
    CreateQuestionComponent,
    MainQuestionBankComponent,
    MainCourseManagementComponent,
    CreateCourseComponent,
  ],
  imports: [
    CommonModule,
    myEducationalSystemRoutingModule,
    HttpClientModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CardClassesComponent,
    CardTestsNotHeldComponent,
    CardTestsUncorrectedComponent,
    CardTestsCompletedComponent,
    CardQuestionComponent,
    NzAutocompleteTriggerDirective,
    NzAutocompleteComponent,
    ProgressCircleComponent,
    CKEditorModule,
    TypeSelectedCourseComponent,
  ],
})
export class MyEducationalSystemModule {
}
