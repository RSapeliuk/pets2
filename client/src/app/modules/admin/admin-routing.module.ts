import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '../../components/admin/admin.component';
import {CommonModule} from '@angular/common';


const routes: Routes = [
  {path: '', component: AdminComponent},
  ];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
