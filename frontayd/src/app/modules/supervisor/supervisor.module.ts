import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { ActivityMonitoringComponent } from './activity-monitoring/activity-monitoring.component';
import { AdminRegistryComponent } from './admin-registry/admin-registry.component';
import { ComplaintRegisterComponent } from './complaint-register/complaint-register.component';
import { AdminSistemComponent } from './admin-sistem/admin-sistem.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { SurveysComponent } from './surveys/surveys.component';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    ActivityMonitoringComponent,
    AdminRegistryComponent,
    ComplaintRegisterComponent,
    AdminSistemComponent,
    InventoriesComponent,
    SurveysComponent,
    DashboardComponent
  ]
})
export class SupervisorModule { }
