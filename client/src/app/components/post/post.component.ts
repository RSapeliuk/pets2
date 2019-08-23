import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post = new Post();
  user: User;

  constructor(public postService: PostService, public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.auth().subscribe(value => {
      this.user = value;
      console.log(this.user);
    });
  }

  savePost() {
    this.postService.savePost(this.post, this.user).subscribe(value => console.log(value));
    console.log(this.user);
  }
}
