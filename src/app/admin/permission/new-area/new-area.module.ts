import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAreaRoutingModule } from './new-area-routing.module';
import { NewAreaComponent } from './new-area.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NewAreaRoutingModule,
    SharedModule
  ],
  declarations: [NewAreaComponent]
})
export class NewAreaModule { }
