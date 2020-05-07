import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: 'user-profile',
        loadChildren: () => import('./profile/user-profile/user-profile.module').then(m => m.UserProfileModule)
      }, {
        path: 'change-password',
        loadChildren: () => import('./profile/change-password/change-password.module').then(m => m.ChangePasswordModule)
      }, {
        path: 'admin',
        loadChildren: () => import('./admin/permission/permission.module').then(m => m.PermissionModule)
      }, {
        path: 'user',
        loadChildren: () => import('./users/user/user.module').then(m => m.UserModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
