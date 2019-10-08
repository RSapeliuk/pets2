import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {PostComponent} from '../../components/post/post.component';
import {FormsModule} from '@angular/forms';
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



@NgModule({
  declarations: [PostComponent, UserViewComponent, PetComponent],
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
    MainPageModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule
    ],
  entryComponents: [PetComponent]
})
export class UserModule { }
