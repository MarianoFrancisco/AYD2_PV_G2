import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { SecurityComponent } from './security/security.component';
import { RolesComponent } from './roles/roles.component';
import { DasboardComponent } from './dashboard/dasboard.component';
import { EmpleyeeAdminComponent } from './empleyee-admin/empleyee-admin.component';
const routes: Routes = [
  {
  path: 'inicio-admin', component: DasboardComponent  
  },
  {
    path: "registro-empleado", component: EmployeeRegisterComponent
  },
  {
    path:'copia-seguridad', component: SecurityComponent
  },
  {
    path:'roles-empelado', component: RolesComponent
  },
  {
    path:'administrar-empleado', component: EmpleyeeAdminComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
