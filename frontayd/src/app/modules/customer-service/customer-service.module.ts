import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerServiceRoutingModule } from './customer-service-routing.module';
import { AccountComponent } from './account/account.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ComplaintsRegisterComponent } from './complaints-register/complaints-register.component';
import { DolarAccountComponent } from './dolar-account/dolar-account.component';
import { SatisfactionComponent } from './satisfaction/satisfaction.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerServiceRoutingModule,
    AccountComponent,
    ConfigurationComponent,
    ComplaintsRegisterComponent,
    DolarAccountComponent,
    SatisfactionComponent
  ]
})
export class CustomerServiceModule { }
