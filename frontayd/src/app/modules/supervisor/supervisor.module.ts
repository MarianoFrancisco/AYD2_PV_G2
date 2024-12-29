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
import { CancellationServiceComponent } from './cancellation-service/cancellation-service.component';
import { LoanApproveCardsComponent } from './loan-approve-cards/loan-approve-cards.component';
import { ModifyEmployeeComponent } from './modify-employee/modify-employee.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DeleteEmployeComponent } from './delete-employe/delete-employe.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { LoanApproveLoansComponent } from './loan-approve-loans/loan-approve-loans.component';
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
    DashboardComponent,
    CancellationServiceComponent,
    LoanApproveCardsComponent,
    ModifyEmployeeComponent,
    ReportesComponent,
    DeleteEmployeComponent,
    PasswordChangeComponent,
    LoanApproveLoansComponent
  ]
})
export class SupervisorModule { }
