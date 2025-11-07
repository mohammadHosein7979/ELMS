import {ModuleWithProviders, NgModule} from '@angular/core';
import {TranslatePipe} from "./pipes/translate.pipe";
import {HttpService} from "./services/http.service";
import {fastrnumberPipe} from './pipes/fastrnumber.pipe';
import {HideStrPipe} from "./pipes/hide-str.pipe";
import {RouterModule} from "@angular/router";
import {HeaderLayoutComponent} from "../layout/header-layout/header-layout.component";
import {FooterLayoutComponent} from "../layout/footer-layout/footer-layout.component";
import {IndexLayoutComponent} from "../layout/index-layout/index-layout.component";
import {NzZorroModule} from "./nz-zorro.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {SwiperModule} from "swiper/angular";
import {LottieModule} from "ngx-lottie";
import player from 'lottie-web';
import {UserService} from "./services/user.service";
import {AuthGuardService} from "./services/auth-gaurd.service";
import {JwtService} from "./services/jwt.service";
import {AuthService} from "./services/auth.service";
import {TokenService} from "./services/token.service";
import {StorageService} from "./helperService/storage.service";
import {HttpTokenInterceptor} from "./services/http.token.interceptor";
import {SidebarLayoutComponent} from "../layout/sidebar-layout/sidebar-layout.component";
import {FilterPipeModule} from "./pipes/highlight.pipe";
import {UtilService} from "./services/util.service";
import {
  IndexLayoutLandingComponent
} from "../landing/layout-landing/index-layout-landing/index-layout-landing.component";
import {
  HeaderLayoutLandingComponent
} from "../landing/layout-landing/header-layout-landing/header-layout-landing.component";
import {
  FooterLayoutLandingComponent
} from "../landing/layout-landing/footer-layout-landing/footer-layout-landing.component";

// import {SpinnerComponent} from "./spinner/spinner.component";

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    TranslatePipe,
    fastrnumberPipe,
    HideStrPipe,
    HeaderLayoutComponent,
    FooterLayoutComponent,
    IndexLayoutComponent,
    SidebarLayoutComponent,
    IndexLayoutLandingComponent,
    HeaderLayoutLandingComponent,
    FooterLayoutLandingComponent,
    // SpinnerComponent
  ],
  exports: [
    TranslatePipe,
    fastrnumberPipe,
    HideStrPipe,
    HeaderLayoutComponent,
    FooterLayoutComponent,
    IndexLayoutComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzZorroModule,
    SwiperModule,
    // SpinnerComponent
  ],
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // LottieModule.forRoot({player: playerFactory}),
    NzZorroModule,
    SwiperModule, FilterPipeModule],
  providers: [provideHttpClient(withInterceptorsFromDi()),UserService]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [HttpService,
        {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
        TranslatePipe,AuthGuardService,JwtService,UserService,TokenService,AuthService,StorageService,UtilService],
    };
  }
}
