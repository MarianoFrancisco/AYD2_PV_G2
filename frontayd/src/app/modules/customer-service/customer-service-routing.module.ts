import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ComplaintsRegisterComponent } from './complaints-register/complaints-register.component';
import { DolarAccountComponent } from './dolar-account/dolar-account.component';
import { SatisfactionComponent } from './satisfaction/satisfaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlockcardsComponent } from './blockcards/blockcards.component';
import { CancelservicesComponent } from './cancelservices/cancelservices.component';
import { CreatecardComponent } from './createcard/createcard.component';
import { LoanapplicationsComponent } from './loanapplications/loanapplications.component';

const routes: Routes = [
  {
    path: 'inicio-atencion-cliente', component: DashboardComponent
  },
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
  },
  {
    path:'bloqueo-cartas', component: BlockcardsComponent
  },
  {
    path:'cancelar-servicios', component: CancelservicesComponent
  },
  {
    path:'crear-tarjetas', component: CreatecardComponent
  },
  {
    path:'solicitud-prestamos-banco', component: LoanapplicationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerServiceRoutingModule { }
