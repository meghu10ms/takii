import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    SharedModule
  ],
  declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
