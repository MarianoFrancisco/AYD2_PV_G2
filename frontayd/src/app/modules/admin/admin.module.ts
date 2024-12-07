import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReportsComponent,
    UsersComponent,
    DashboardComponent
  ]
})
export class AdminModule { }
