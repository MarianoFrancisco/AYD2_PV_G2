import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerServiceRoutingModule } from './customer-service-routing.module';
import { AccountComponent } from './account/account.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ComplaintsRegisterComponent } from './complaints-register/complaints-register.component';
import { DolarAccountComponent } from './dolar-account/dolar-account.component';
import { SatisfactionComponent } from './satisfaction/satisfaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlockcardsComponent } from './blockcards/blockcards.component';
import { CancelservicesComponent } from './cancelservices/cancelservices.component';
import { CreatecardComponent } from './createcard/createcard.component';
import { LoanapplicationsComponent } from './loanapplications/loanapplications.component';
import { RequestInfoComponent } from './request-info/request-info.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerServiceRoutingModule,
    AccountComponent,
    ConfigurationComponent,
    ComplaintsRegisterComponent,
    DolarAccountComponent,
    SatisfactionComponent,
    DashboardComponent,
    BlockcardsComponent,
    CancelservicesComponent,
    CreatecardComponent,
    LoanapplicationsComponent,
    RequestInfoComponent
  ]
})
export class CustomerServiceModule { }
