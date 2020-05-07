import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppVersionRoutingModule } from './app-version-routing.module';
import { AppVersionComponent } from './app-version.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        AppVersionRoutingModule,
        SharedModule
    ],
    declarations: [AppVersionComponent]
})
export class AppVersionModule { }
