import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoleRoutingModule } from './new-role-routing.module';
import { NewRoleComponent } from './new-role.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        NewRoleRoutingModule,
        SharedModule
    ],
    declarations: [NewRoleComponent]
})
export class NewRoleModule { }
