import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewPermisComponent} from './new-permis.component';

const routes: Routes = [
  {
    path: '',
    component: NewPermisComponent,
    data: {
      breadcrumb: 'New Permission',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'New Permission Information - Permission',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPermisRoutingModule { }
