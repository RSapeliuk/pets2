import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginationComponent} from '../../components/logination/logination.component';
import {RegistrationComponent} from '../../components/registration/registration.component';
import {MainPageComponent} from '../../components/main-page/main-page.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'login', component: LoginationComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'user', loadChildren: 'src/app/modules/user/user.module#UserModule'}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainPageRoutingModule {
}
