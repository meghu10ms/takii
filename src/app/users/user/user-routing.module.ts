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
            },
            //   {
            //     path: 'new-ads',
            //     loadChildren: () => import('./new-ads/new-ads.module').then(m => m.NewAdsModule)
            //   }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
