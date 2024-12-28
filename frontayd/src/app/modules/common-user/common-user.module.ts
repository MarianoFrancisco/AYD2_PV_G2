import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonUserRoutingModule } from './common-user-routing.module';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsComponent } from './payments/payments.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransfersComponent } from './transfers/transfers.component';
import { LoanPaymentsComponent } from './loan-payments/loan-payments.component';
import { BalancesComponent} from './balances/balances.component'
import { PayCreditcardComponent } from './pay-creditcard/pay-creditcard.component';
import { CambiosComponent } from './cambios/cambios.component';
import { RequestInfoComponent } from '../customer-service/request-info/request-info.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonUserRoutingModule,
    AccountComponent,
    DashboardComponent,
    PaymentsComponent,
    TransactionsComponent,
    TransfersComponent,
    LoanPaymentsComponent,
    BalancesComponent,
    PayCreditcardComponent,
    CambiosComponent,
    RequestInfoComponent
  ]
})
export class CommonUserModule { }
