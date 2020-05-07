import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdsComponent} from './ads.component';

const routes: Routes = [
  {
    path: '',
    component: AdsComponent,
    data: {
      breadcrumb: 'Ads',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Ads Information - Ads',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
