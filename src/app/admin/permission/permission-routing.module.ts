import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Admin Permissions',
      status: false
    },
    children: [
      {
        path: 'ads',
        loadChildren: () => import('./ads/ads.module').then(m => m.AdsModule)
      },
      {
        path: 'new-ads',
        loadChildren: () => import('./new-ads/new-ads.module').then(m => m.NewAdsModule)
      },
      {
        path: 'offers',
        loadChildren: () => import('./offers/offers.module').then(m => m.OffersModule)
      },
      {
        path: 'new-offer',
        loadChildren: () => import('./new-offer/new-offer.module').then(m => m.NewOfferModule)
      },{
        path: 'subscriptions',
        loadChildren: () => import('./subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
      },{
        path: 'new-subscription',
        loadChildren: () => import('./new-subscription/new-subscription.module').then(m => m.NewSubscriptionModule)
      },{
        path: 'area',
        loadChildren: () => import('./area/area.module').then(m => m.AreaModule)
      },{
        path: 'new-area',
        loadChildren: () => import('./new-area/new-area.module').then(m => m.NewAreaModule)
      },{
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
      },{
        path: 'new-role',
        loadChildren: () => import('./new-role/new-role.module').then(m => m.NewRoleModule)
      },{
        path: 'permis',
        loadChildren: () => import('./permis/permis.module').then(m => m.PermisModule)
      },{
        path: 'new-permis',
        loadChildren: () => import('./new-permis/new-permis.module').then(m => m.NewPermisModule)
      },{
        path: 'app-version',
        loadChildren: () => import('./app-version/app-version.module').then(m => m.AppVersionModule)
      },{
        path: 'new-app-version',
        loadChildren: () => import('./new-app-version/new-app-version.module').then(m => m.NewAppVersionModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
