import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermisComponent} from './permis.component';

const routes: Routes = [
  {
    path: '',
    component: PermisComponent,
    data: {
      breadcrumb: 'Permissions',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Permissions Information - Permissions',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisRoutingModule { }
