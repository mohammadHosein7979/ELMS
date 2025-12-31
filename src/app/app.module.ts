import {NgModule, isDevMode, APP_INITIALIZER} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {ToastrModule} from "ngx-toastr";
import {SharedModule} from "./shared/shared.module";
import {UpdateService} from "./shared/services/update.service";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {CustomErrorHandlerService} from "./shared/services/CustomErrorHandler.service";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {ProfileComponent} from "./pages/profile/profile.component";
import {PersianDatepickerComponent} from "./components/persian-datepicker/persian-datepicker.component";
import {FileUploadComponent} from "./components/file-upload/file-upload.component";


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,

  ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,

        ToastrModule.forRoot(),
        SharedModule.forRoot(),
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: false}),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        PersianDatepickerComponent,
        FileUploadComponent,

    ],
  providers: [UpdateService, provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (appInitializer: AppInitializer) => appInitializer.init(),
    //   deps: [AppInitializer],
    //   multi: true
    // },
    { provide: HTTP_INTERCEPTORS,
    useClass: CustomErrorHandlerService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
