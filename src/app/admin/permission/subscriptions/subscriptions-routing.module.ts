import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionsComponent} from './subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsComponent,
    data: {
      breadcrumb: 'Subscriptions',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Subscriptions Information - Subscriptions',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
