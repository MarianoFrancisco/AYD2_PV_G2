import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsComponent } from './payments/payments.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransfersComponent } from './transfers/transfers.component';

const routes: Routes = [
{
  path:'cuenta/:idcuenta', component: AccountComponent
},
{
  path:'dashboard', component: DashboardComponent
},
{
  path:'pagos', component: PaymentsComponent
},
{
  path:'transacciones/:idtrans', component: TransactionsComponent
},
{
  path:'transferencia', component: TransfersComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonUserRoutingModule { }
