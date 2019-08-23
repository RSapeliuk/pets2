import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginationComponent} from './components/logination/logination.component';
import {PostComponent} from './components/post/post.component';


const routes: Routes = [
  {path: 'login', component: LoginationComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'user/:username/addPost', component: PostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
