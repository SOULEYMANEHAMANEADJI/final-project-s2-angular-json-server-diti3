import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './employe/add/add.component';
import { EditComponent } from './employe/edit/edit.component';
import { ListComponent } from './employe/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { AddServiceComponent } from './employe/add-service/add-service.component';
@NgModule({
  //Component
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    ListComponent,
    LoginComponent,
    LogoutComponent,
    AddServiceComponent
  ],
  //Modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  //Services
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }