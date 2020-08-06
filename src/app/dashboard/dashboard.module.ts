// Angular
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';

import { DashboardRoutingModule } from './dashboard.routing';
import { ManagerModule } from './manager/manager.module';



@NgModule({
  imports: [
   CommonModule,
   FormsModule,
   ReactiveFormsModule,
   DashboardRoutingModule,
   ManagerModule
  ],
  declarations: [
   UserComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule { }
