import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewAppVersionComponent} from './new-app-version.component';

const routes: Routes = [
  {
    path: '',
    component: NewAppVersionComponent,
    data: {
      breadcrumb: 'New App Version',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'New App Version Information - New App Version',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAppVersionRoutingModule { }
