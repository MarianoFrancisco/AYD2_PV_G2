import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { SecurityComponent } from './security/security.component';
import { RolesComponent } from './roles/roles.component';
const routes: Routes = [
{
  path: "registro-empleado", component: EmployeeRegisterComponent
},
{
  path:'copia-seguridad', component: SecurityComponent
},
{
  path:'roles-empelado', component: RolesComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
