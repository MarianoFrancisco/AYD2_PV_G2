import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsComponent } from './payments/payments.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransfersComponent } from './transfers/transfers.component';
import {LoanPaymentsComponent} from './loan-payments/loan-payments.component'

const routes: Routes = [
{
  path:'cuenta', component: AccountComponent
},
{
  path:'dashboard', component: DashboardComponent
},
{
  path:'pagos', component: PaymentsComponent
},
{
  path:'transacciones', component: TransactionsComponent
},
{
  path:'transferencia', component: TransfersComponent
},
{
  path:'prestamos', component: LoanPaymentsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonUserRoutingModule { }
