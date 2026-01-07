import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { paymentRoutingModule} from "./payment-routing.module";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {ReturnBankComponent} from "./return-bank/return-bank.component";
@NgModule({
  declarations: [

    ReturnBankComponent
  ],
    imports: [
        CommonModule,
        paymentRoutingModule,
        HttpClientModule,
        SharedModule,
    ],
})
export class PaymentModule { }
