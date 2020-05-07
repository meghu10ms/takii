import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserProfileComponent} from './user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    data: {
      breadcrumb: 'User Profile',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'User Information - User Profile',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
