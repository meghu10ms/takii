import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPermisRoutingModule } from './new-permis-routing.module';
import { NewPermisComponent } from './new-permis.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        NewPermisRoutingModule,
        SharedModule
    ],
    declarations: [NewPermisComponent]
})
export class NewPermisModule { }
