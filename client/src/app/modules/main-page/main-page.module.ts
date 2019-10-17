import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationComponent} from '../../components/registration/registration.component';
import {LoginationComponent} from '../../components/logination/logination.component';
import {PostComponent} from '../../components/post/post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatDialogModule, MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatMenuModule,
  MatNativeDateModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {MainPageRoutingModule} from './main-page-routing.module';
import {MainPageComponent} from '../../components/main-page/main-page.component';
import {PostDetailsComponent} from '../../components/post-details/post-details.component';
import {HeaderComponent} from '../../components/header/header.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    LoginationComponent,
    MainPageComponent,
    PostDetailsComponent,
    HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MainPageRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [],
  exports: [
    HeaderComponent
  ],
  entryComponents: [LoginationComponent, PostDetailsComponent]
})
export class MainPageModule {
}
