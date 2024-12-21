import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerServiceRoutingModule } from './customer-service-routing.module';
import { AccountComponent } from './account/account.component';
import { ConfigurationComponent } from './configuration/configuration.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerServiceRoutingModule,
    AccountComponent,
    ConfigurationComponent
  ]
})
export class CustomerServiceModule { }
