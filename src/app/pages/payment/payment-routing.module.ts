import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReturnBankComponent} from "./return-bank/return-bank.component";


const routes: Routes = [
      {path: '', component: ReturnBankComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class paymentRoutingModule { }
