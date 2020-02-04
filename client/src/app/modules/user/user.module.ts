import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {PostComponent} from '../../components/post/post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCardModule,
  MatDatepickerModule,
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatSelectModule, MatSidenavModule, MatTabsModule
} from '@angular/material';
import {UserViewComponent} from '../../components/user-view/user-view.component';
import {MainPageModule} from '../main-page/main-page.module';
import {PetComponent} from '../../components/pet/pet.component';
import {ChatMessagesComponent} from '../../components/chat-messages/chat-messages.component';
import {StarRatingModule} from 'angular-star-rating';
import {ToastrModule} from 'ngx-toastr';
import {WebSocketApiService} from '../../services/web-socket-api.service';



@NgModule({
  declarations: [PostComponent,
    UserViewComponent,
    PetComponent,
    ChatMessagesComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MainPageModule,
    MatSidenavModule,
    MatTabsModule,
    ToastrModule.forRoot({ timeOut: 3000 }),
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [WebSocketApiService],
  entryComponents: [PetComponent]
})
export class UserModule { }
