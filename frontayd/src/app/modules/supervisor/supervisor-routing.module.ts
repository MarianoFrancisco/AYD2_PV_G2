import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityMonitoringComponent } from './activity-monitoring/activity-monitoring.component';
import { AdminRegistryComponent } from './admin-registry/admin-registry.component';
import { ComplaintRegisterComponent } from './complaint-register/complaint-register.component';

const routes: Routes = [
  {
    path:'monitoreo', component: ActivityMonitoringComponent
  },
  {
    path:'registrar-admin', component: AdminRegistryComponent
  },
  {
    path:'registros-quejas', component: ComplaintRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
