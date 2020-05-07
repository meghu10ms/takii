import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OffersComponent} from './offers.component';

const routes: Routes = [
  {
    path: '',
    component: OffersComponent,
    data: {
      breadcrumb: 'Offers',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Offer Information - Offers',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
