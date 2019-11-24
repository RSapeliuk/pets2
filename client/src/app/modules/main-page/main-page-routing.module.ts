import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginationComponent} from '../../components/logination/logination.component';
import {RegistrationComponent} from '../../components/registration/registration.component';
import {MainPageComponent} from '../../components/main-page/main-page.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'login', component: LoginationComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'user/:id', loadChildren: 'src/app/modules/user/user.module#UserModule'},
  {path: 'admin', loadChildren: 'src/app/modules/admin/admin.module#AdminModule'}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainPageRoutingModule {
}
