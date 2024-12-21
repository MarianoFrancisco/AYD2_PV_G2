import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ComplaintsRegisterComponent } from './complaints-register/complaints-register.component';
import { DolarAccountComponent } from './dolar-account/dolar-account.component';
import { SatisfactionComponent } from './satisfaction/satisfaction.component';

const routes: Routes = [
  {
    path: 'crear-cuenta', component: AccountComponent
  },
  {
    path:'configuracion-cuenta', component: ConfigurationComponent
  },
  {
    path:'registrar-queja', component: ComplaintsRegisterComponent
  },
  {
    path:'cuentas-dolar', component: DolarAccountComponent
  },
  {
    path:'encuesta-satisfaccion', component: SatisfactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerServiceRoutingModule { }
