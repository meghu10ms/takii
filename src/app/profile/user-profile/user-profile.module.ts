import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }
