import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationComponent} from '../../components/registration/registration.component';
import {LoginationComponent} from '../../components/logination/logination.component';
import {PostComponent} from '../../components/post/post.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {MainPageRoutingModule} from './main-page-routing.module';
import {MainPageComponent} from '../../components/main-page/main-page.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    LoginationComponent,
    MainPageComponent],
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
    MatDialogModule
  ],
  providers: [],
  entryComponents: [LoginationComponent]
})
export class MainPageModule {
}
