import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {reportsRoutingModule} from "./reports-routing.module";
import {CommonModule} from "@angular/common";
import {SwiperModule} from "swiper/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {LikeComponent} from "../../components/like/like.component";
import {EnteringClassComponent} from "../../components/entering-class/entering-class.component";
import {NzTimelineComponent, NzTimelineItemComponent} from "ng-zorro-antd/timeline";
import {
  MainFinancialTransactionsComponent
} from "./pages/financial-transactions/main-financial-transactions/main-financial-transactions.component";

@NgModule({
  declarations: [
    MainFinancialTransactionsComponent
  ],
  imports: [
    CommonModule,
    reportsRoutingModule,
    HttpClientModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LikeComponent,
    EnteringClassComponent,
    NzTimelineComponent,
    NzTimelineItemComponent,
  ],
})
export class ReportsModule {
}
