import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChangePasswordComponent} from './change-password.component';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent,
    data: {
      breadcrumb: 'Change Password',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'User Information - Change Password',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }
