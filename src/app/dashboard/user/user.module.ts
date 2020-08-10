// Angular
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user.routing';
import { FilterPipeModule } from 'ngx-filter-pipe';

@NgModule({
  imports: [
   CommonModule,
   FormsModule,
   ReactiveFormsModule,
   UserRoutingModule,
   ModalModule.forRoot(),
   NgxPaginationModule,
   FilterPipeModule
  ],
  declarations: [
   UserComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class UserModule { }
