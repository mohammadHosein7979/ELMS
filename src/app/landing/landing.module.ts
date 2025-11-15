import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {landingRoutingModule} from "./landing-routing.module";
import {CommonModule} from "@angular/common";
import {SwiperModule} from "swiper/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomePageComponent } from './pages/home-page/home-page.component';
import {SliderEducationComponent} from "../pages/education/components/slider-education/slider-education.component";
import {
  CardPreProductionEducationComponent
} from "../pages/education/components/card-pre-production-education/card-pre-production-education.component";
import {CardEducationComponent} from "../pages/education/components/card-education/card-education.component";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";


@NgModule({
  declarations: [

    HomePageComponent
  ],
  imports: [
    CommonModule,
    landingRoutingModule,
    HttpClientModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule,
    SliderEducationComponent,
    CardPreProductionEducationComponent,
    CardEducationComponent,
    NzTabSetComponent,
    NzTabComponent,
  ],
})
export class LandingModule {
}
