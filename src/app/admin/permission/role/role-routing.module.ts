import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoleComponent} from './role.component';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    data: {
      breadcrumb: 'Roles',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Roles Information - Roles',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
