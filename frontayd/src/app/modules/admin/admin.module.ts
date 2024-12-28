import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { RolesComponent } from './roles/roles.component';
import { SecurityComponent } from './security/security.component';
import { DasboardComponent } from './dashboard/dasboard.component';
import { EmpleyeeAdminComponent } from './empleyee-admin/empleyee-admin.component';
import { DeleteEmployeComponent } from './delete-employe/delete-employe.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { RequestInfoComponent } from '../customer-service/request-info/request-info.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    EmployeeRegisterComponent,
    EmpleyeeAdminComponent,
    RolesComponent,
    SecurityComponent,
    DasboardComponent,
    PasswordChangeComponent,
    DeleteEmployeComponent, 
    RequestInfoComponent

  ]
})
export class AdminModule { }
