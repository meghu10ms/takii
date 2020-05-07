import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewRoleComponent} from './new-role.component';

const routes: Routes = [
  {
    path: '',
    component: NewRoleComponent,
    data: {
      breadcrumb: 'New Role',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'New Role Information - New Role',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoleRoutingModule { }
