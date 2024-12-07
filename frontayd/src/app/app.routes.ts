import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { ClientNavbarComponent } from './shared/layouts/client-navbar/client-navbar.component';
import { AdminNavbarComponent } from './shared/layouts/admin-navbar/admin-navbar.component';
export const routes: Routes = [

{
    path:'session',
    component: AuthLayoutComponent,
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
},
{
    path: 'user',
    component: ClientNavbarComponent,
    loadChildren:() => import('./modules/common-user/common-user.module').then(m => m.CommonUserModule)
},
{
    path: 'admin',
    component: AdminNavbarComponent,
    loadChildren:() => import('./modules/admin/admin.module').then(m => m.AdminModule)
},
{
    path: "",
    redirectTo: "session/login",
    pathMatch: 'full'
},
{
    path: '**',
    redirectTo: "session/login",
    pathMatch: 'full'
}
];
