import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { ClientNavbarComponent } from './shared/layouts/client-navbar/client-navbar.component';
import { InicioNavbarComponent } from './shared/layouts/inicio-navbar/inicio-navbar.component';
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
    path:'admin',
    loadChildren:() => import('./modules/admin/admin.module').then(m => m.AdminModule)
},
{
    path:'customer',
    loadChildren:() => import('./modules/customer-service/customer-service.module').then(m => m.CustomerServiceModule)
},
{
    path:'supervisor',
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
