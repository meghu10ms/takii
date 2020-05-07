import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAdsRoutingModule } from './new-ads-routing.module';
import { NewAdsComponent } from './new-ads.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NewAdsRoutingModule,
    SharedModule
  ],
  declarations: [NewAdsComponent]
})
export class NewAdsModule { }
