import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AreaComponent} from './area.component';

const routes: Routes = [
  {
    path: '',
    component: AreaComponent,
    data: {
      breadcrumb: 'Area',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Area Information - Area',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule { }
