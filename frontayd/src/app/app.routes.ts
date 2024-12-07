import { Routes } from '@angular/router';

import { ClientNavbarComponent } from './shared/layouts/client-navbar/client-navbar.component';
export const routes: Routes = [

{
    path: 'user',
    component: ClientNavbarComponent,
    loadChildren:() => import('./modules/common-user/common-user.module').then(m => m.CommonUserModule)
},
{
    path: "",
    redirectTo: "user/dashboard",
    pathMatch: 'full'
},
{
    path: '**',
    redirectTo: "user/dashboard",
    pathMatch: 'full'
}
];
