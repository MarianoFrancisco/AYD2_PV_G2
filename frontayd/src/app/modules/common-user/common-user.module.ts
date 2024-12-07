import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonUserRoutingModule } from './common-user-routing.module';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsComponent } from './payments/payments.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransfersComponent } from './transfers/transfers.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonUserRoutingModule,
    AccountComponent,
    DashboardComponent,
    PaymentsComponent,
    TransactionsComponent,
    TransfersComponent
  ]
})
export class CommonUserModule { }
