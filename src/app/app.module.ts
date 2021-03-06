﻿import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {appRoutingModule} from './app.routing';
import {JwtInterceptor, ErrorInterceptor} from './_helpers';
import {AppComponent} from './app.component';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AlertComponent} from './_components';
import {RoleComponent} from './role/role.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {NbSidebarModule, NbLayoutModule, NbCardModule, NbListModule, NbSidebarService } from '@nebular/theme';
import {NbThemeModule} from '@nebular/theme';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbThemeModule.forRoot(),
    NbSidebarModule,
    NbLayoutModule,
    NbListModule,
    NbCardModule,
    appRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    RoleComponent,
    UserDetailsComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    [NbSidebarService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
