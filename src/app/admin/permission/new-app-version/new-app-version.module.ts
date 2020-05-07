import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAppVersionRoutingModule } from './new-app-version-routing.module';
import { NewAppVersionComponent } from './new-app-version.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        NewAppVersionRoutingModule,
        SharedModule
    ],
    declarations: [NewAppVersionComponent]
})
export class NewAppVersionModule { }
