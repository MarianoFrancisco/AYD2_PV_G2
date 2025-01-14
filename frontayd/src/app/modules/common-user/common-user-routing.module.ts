import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsComponent } from './payments/payments.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransfersComponent } from './transfers/transfers.component';
import {LoanPaymentsComponent} from './loan-payments/loan-payments.component'
import { BalancesComponent } from './balances/balances.component';
import { PayCreditcardComponent } from './pay-creditcard/pay-creditcard.component';
import { CambiosComponent } from './cambios/cambios.component';
import { RequestInfoComponent } from '../customer-service/request-info/request-info.component';
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
},
{
  path:'balances', component: BalancesComponent
},
{
  path:'pago-tarjeta-credito', component: PayCreditcardComponent
},
{
  path: 'cambios-moneda', component: CambiosComponent
},
{
  path:'solicitud-cambio-info', component: RequestInfoComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonUserRoutingModule { }
