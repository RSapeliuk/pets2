import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PostComponent} from '../../components/post/post.component';
import {UserViewComponent} from '../../components/user-view/user-view.component';
import {ChatMessagesComponent} from '../../components/chat-messages/chat-messages.component';

const routes: Routes = [
  {path: '', component: UserViewComponent},
  {path: 'addPost', component: PostComponent},
  {path: 'addPet'},
  {path: 'chat', component: ChatMessagesComponent}
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
