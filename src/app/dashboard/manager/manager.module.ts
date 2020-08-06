// Angular
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { ManagerRoutingModule } from './manager.routing';
import { TasksComponent } from './tasks/tasks.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  imports: [
   CommonModule,
   FormsModule,
   ReactiveFormsModule,
  ManagerRoutingModule,
  ModalModule.forRoot(),
  DateTimePickerModule
  ],
  declarations: [
  UsersComponent,
  TasksComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ManagerModule { }
