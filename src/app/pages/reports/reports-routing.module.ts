import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MainFinancialTransactionsComponent
} from "./pages/financial-transactions/main-financial-transactions/main-financial-transactions.component";



const routes: Routes = [
      {path: 'financial-transactions', component: MainFinancialTransactionsComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class reportsRoutingModule { }
