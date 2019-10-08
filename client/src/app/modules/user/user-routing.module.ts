import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PostComponent} from '../../components/post/post.component';
import {UserViewComponent} from '../../components/user-view/user-view.component';

const routes: Routes = [
  {path: '', component: UserViewComponent},
  {path: 'addPost', component: PostComponent},
  {path: 'addPet'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
