import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'User Operations',
            status: false
        },
        children: [
            {
                path: 'user-list',
                loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListModule)
            }, {
                path: 'view-user',
                loadChildren: () => import('../../profile/user-profile/user-profile.module').then(m => m.UserProfileModule)
            }, {
                path: 'add-user',
                loadChildren: () => import('./add-user/add-user.module').then(m => m.AddUserModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
