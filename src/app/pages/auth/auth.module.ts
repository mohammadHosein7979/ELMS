import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { authRoutingModule} from "./auth-routing.module";
import {CommonModule} from "@angular/common";
import {SwiperModule} from "swiper/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
@NgModule({
  declarations: [

    LoginComponent,
    RegisterComponent
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
