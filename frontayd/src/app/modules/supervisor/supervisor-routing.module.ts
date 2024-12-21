import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityMonitoringComponent } from './activity-monitoring/activity-monitoring.component';
import { AdminRegistryComponent } from './admin-registry/admin-registry.component';
import { ComplaintRegisterComponent } from './complaint-register/complaint-register.component';
import { AdminSistemComponent } from './admin-sistem/admin-sistem.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { SurveysComponent } from './surveys/surveys.component';
const routes: Routes = [
  {
    path:'monitoreo', component: ActivityMonitoringComponent
  },
  {
    path:'registrar-admin', component: AdminRegistryComponent
  },
  {
    path:'registros-quejas', component: ComplaintRegisterComponent
  },
  {
    path:'informacion-admin', component: AdminSistemComponent
  },
  {
    path:'inventarios', component: InventoriesComponent
  },
  {
    path:'encuesta-satisfaccion', component: SurveysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
