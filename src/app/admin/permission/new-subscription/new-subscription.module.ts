import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewSubscriptionRoutingModule } from './new-subscription-routing.module';
import { NewSubscriptionComponent } from './new-subscription.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NewSubscriptionRoutingModule,
    SharedModule
  ],
  declarations: [NewSubscriptionComponent]
})
export class NewSubscriptionModule { }
