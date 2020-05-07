import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: {
      breadcrumb: 'User List',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'User Information - User List',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }
