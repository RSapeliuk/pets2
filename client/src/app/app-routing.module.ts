import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';


const routes: Routes = [
  {path: '', loadChildren: 'src/app/modules/main-page/main-page.module#MainPageModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ToastrModule.forRoot({timeOut: 3000})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
