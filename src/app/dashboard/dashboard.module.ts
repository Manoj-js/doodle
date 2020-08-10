// Angular
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DashboardRoutingModule } from './dashboard.routing';
import { ManagerModule } from './manager/manager.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserModule } from './user/user.module';


@NgModule({
  imports: [
   CommonModule,
   FormsModule,
   ReactiveFormsModule,
   DashboardRoutingModule,
   ManagerModule,
   ModalModule.forRoot(),
   NgxPaginationModule,
   UserModule
  ],
  declarations: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule { }
