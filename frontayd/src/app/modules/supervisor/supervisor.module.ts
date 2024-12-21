import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { ActivityMonitoringComponent } from './activity-monitoring/activity-monitoring.component';
import { AdminRegistryComponent } from './admin-registry/admin-registry.component';
import { ComplaintRegisterComponent } from './complaint-register/complaint-register.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    ActivityMonitoringComponent,
    AdminRegistryComponent,
    ComplaintRegisterComponent
  ]
})
export class SupervisorModule { }
