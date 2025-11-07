import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {educationRoutingModule} from "./education-routing.module";
import {CommonModule} from "@angular/common";
import {SwiperModule} from "swiper/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {MainEducationComponent} from './main-education/main-education.component';
import {SliderEducationComponent} from "./components/slider-education/slider-education.component";
import {
  CardPreProductionEducationComponent
} from "./components/card-pre-production-education/card-pre-production-education.component";
import {CardEducationComponent} from "./components/card-education/card-education.component";

@NgModule({
  declarations: [
    MainEducationComponent,
  ],
    imports: [
        CommonModule,
        educationRoutingModule,
        HttpClientModule,
        SwiperModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        SliderEducationComponent,
        CardPreProductionEducationComponent,
        CardEducationComponent,
    ],
})
export class EducationModule {
}
