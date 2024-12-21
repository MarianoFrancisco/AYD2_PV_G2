import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { RolesComponent } from './roles/roles.component';
import { SecurityComponent } from './security/security.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    EmployeeRegisterComponent,
    RolesComponent,
    SecurityComponent
  ]
})
export class AdminModule { }
