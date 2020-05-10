import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddUserComponent} from './add-user.component';

const routes: Routes = [
  {
    path: '',
    component: AddUserComponent,
    data: {
      breadcrumb: 'User Registration',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'User Registration Information - User Registration',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUserRoutingModule { }
