import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewAdsComponent} from './new-ads.component';

const routes: Routes = [
  {
    path: '',
    component: NewAdsComponent,
    data: {
      breadcrumb: 'New Ads',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Ads Information - New Ads',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAdsRoutingModule { }
