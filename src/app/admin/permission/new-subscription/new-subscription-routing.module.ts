import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewSubscriptionComponent} from './new-subscription.component';

const routes: Routes = [
  {
    path: '',
    component: NewSubscriptionComponent,
    data: {
      breadcrumb: 'New Subscription',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Offer Information - New Subscription',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewSubscriptionRoutingModule { }
