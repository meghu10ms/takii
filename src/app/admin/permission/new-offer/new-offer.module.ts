import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewOfferRoutingModule } from './new-offer-routing.module';
import { NewOfferComponent } from './new-offer.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NewOfferRoutingModule,
    SharedModule
  ],
  declarations: [NewOfferComponent]
})
export class NewOfferModule { }
