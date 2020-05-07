import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppVersionComponent} from './app-version.component';

const routes: Routes = [
  {
    path: '',
    component: AppVersionComponent,
    data: {
      breadcrumb: 'App Versions',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'App Versions Information - App Versions',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppVersionRoutingModule { }
