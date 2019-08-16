import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginationComponent} from "./components/logination/logination.component";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
