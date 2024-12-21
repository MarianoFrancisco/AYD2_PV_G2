import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { ClientNavbarComponent } from './shared/layouts/client-navbar/client-navbar.component';
import { InicioNavbarComponent } from './shared/layouts/inicio-navbar/inicio-navbar.component';
import { AdminNavbarComponent } from './shared/layouts/admin-navbar/admin-navbar.component';
import { CustomerNavbarComponent } from './shared/layouts/customer-navbar/customer-navbar.component';
import { SupervisorNavbarComponent } from './shared/layouts/supervisor-navbar/supervisor-navbar.component';
import { MfaComponent } from './core/auth/mfa/mfa.component';
export const routes: Routes = [

{
    path: 'user',
    component: ClientNavbarComponent,
    loadChildren:() => import('./modules/common-user/common-user.module').then(m => m.CommonUserModule)
},
{
 path: 'login', component: LoginComponent
},
{
    path:'mfa-factor', component: MfaComponent
}, 
{
    path:'admin',
    component: AdminNavbarComponent,
    loadChildren:() => import('./modules/admin/admin.module').then(m => m.AdminModule)
},
{
    path:'customer',
    component: CustomerNavbarComponent,
    loadChildren:() => import('./modules/customer-service/customer-service.module').then(m => m.CustomerServiceModule)
},
{
    path:'supervisor',
    component: SupervisorNavbarComponent,
    loadChildren:() => import('./modules/supervisor/supervisor.module').then(m => m.SupervisorModule)
},
{
    path: "",
    redirectTo: "login",
    pathMatch: 'full'
},
{
    path: '**',
    redirectTo: "login",
    pathMatch: 'full'
}
];
