import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthServiceService } from './Services/auth-service.service';
import { AuthInterceptor } from './Services/interceptor/interceptor.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    DashboardModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    AuthServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
