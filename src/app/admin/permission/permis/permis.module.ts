import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisRoutingModule } from './permis-routing.module';
import { PermisComponent } from './permis.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        PermisRoutingModule,
        SharedModule
    ],
    declarations: [PermisComponent]
})
export class PermisModule { }
