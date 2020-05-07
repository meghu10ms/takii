import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewAreaComponent} from './new-area.component';

const routes: Routes = [
  {
    path: '',
    component: NewAreaComponent,
    data: {
      breadcrumb: 'New Area',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'New Area Information - New Area',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAreaRoutingModule { }
