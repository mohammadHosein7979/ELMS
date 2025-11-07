import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { authRoutingModule} from "./auth-routing.module";
import {CommonModule} from "@angular/common";
import {SwiperModule} from "swiper/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {ConvertPricePipe} from "../../shared/pipes/convertPrice.pipe";
import {LoginComponent} from "./login/login.component";
@NgModule({
  declarations: [

    LoginComponent
  ],
  imports: [
    CommonModule,
    authRoutingModule,
    HttpClientModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class AuthModule { }
