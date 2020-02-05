import {Component, Inject, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/Post';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: Post;
  rating: number;
  user: User;


  constructor(public postService: PostService,
              public dialogRef: MatDialogRef<PostDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Post,
              public authUser: AuthService) {
  }

  ngOnInit() {
    this.postService.getPostById(this.data.id).subscribe(value => {
      this.post = value;
    });
    this.authUser.getUser().subscribe(value => this.user = value);
  }
  onClick() {
    this.dialogRef.close();
  }

  updateUserRating(event) {
    this.rating = event.valueOf();
    if (this.user) {
      this.authUser.updateUserRating(this.post.user, this.rating).subscribe(value => this.post.user.rating = value);
    }
  }

}
