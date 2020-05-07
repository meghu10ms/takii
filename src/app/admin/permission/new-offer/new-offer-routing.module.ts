import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewOfferComponent} from './new-offer.component';

const routes: Routes = [
  {
    path: '',
    component: NewOfferComponent,
    data: {
      breadcrumb: 'New Offer',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Offer Information - New Offer',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewOfferRoutingModule { }
