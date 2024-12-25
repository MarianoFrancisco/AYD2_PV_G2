import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { SecurityComponent } from './security/security.component';
import { RolesComponent } from './roles/roles.component';
import { DasboardComponent } from './dashboard/dasboard.component';
import { EmpleyeeAdminComponent } from './empleyee-admin/empleyee-admin.component';
import { DeleteEmployeComponent } from './delete-employe/delete-employe.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
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
  },
  {
    path:'solicitud-delete-empleado', component: DeleteEmployeComponent
  },
  {
    path:'cambio-contrasena', component: PasswordChangeComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
