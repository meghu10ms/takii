import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionsComponent } from './subscriptions.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    SharedModule
  ],
  declarations: [SubscriptionsComponent]
})
export class SubscriptionsModule { }
