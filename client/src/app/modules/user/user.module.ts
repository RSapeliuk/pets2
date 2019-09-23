import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {PostComponent} from '../../components/post/post.component';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import {UserViewComponent} from '../../components/user-view/user-view.component';
import {MainPageModule} from '../main-page/main-page.module';



@NgModule({
  declarations: [PostComponent, UserViewComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    UserRoutingModule,
    MainPageModule
  ]
})
export class UserModule { }
