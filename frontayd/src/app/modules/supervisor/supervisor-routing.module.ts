import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityMonitoringComponent } from './activity-monitoring/activity-monitoring.component';
import { AdminRegistryComponent } from './admin-registry/admin-registry.component';
import { ComplaintRegisterComponent } from './complaint-register/complaint-register.component';
import { AdminSistemComponent } from './admin-sistem/admin-sistem.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { SurveysComponent } from './surveys/surveys.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CancellationServiceComponent } from './cancellation-service/cancellation-service.component';
import { LoanApproveCardsComponent } from './loan-approve-cards/loan-approve-cards.component';
import { ModifyEmployeeComponent } from './modify-employee/modify-employee.component';
import { DeleteEmployeComponent } from './delete-employe/delete-employe.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { LoanApproveLoansComponent } from './loan-approve-loans/loan-approve-loans.component';

const routes: Routes = [
  {
    path:'inicio-supervisor', component: DashboardComponent
  },
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
  },
  {
    path:'Reportes', component: ReportesComponent
  },
  {
    path:'cancelar-servicios', component: CancellationServiceComponent
  },
  {
    path:'prestamos-aprobar-tarjetas', component: LoanApproveCardsComponent
  },
  {
    path:'prestamos-aprobar-prestamos', component: LoanApproveLoansComponent
  },
  {
    path:'modificar-empleado', component: ModifyEmployeeComponent
  },
  {
    path:'solicitud-delete-empleado', component: DeleteEmployeComponent
  },
  {
    path:'solicitud-pass-empleado', component: PasswordChangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
