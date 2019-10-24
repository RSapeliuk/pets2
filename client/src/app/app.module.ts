import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserViewComponent } from './components/user-view/user-view.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { HeaderComponent } from './components/header/header.component';
import { PetComponent } from './components/pet/pet.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
