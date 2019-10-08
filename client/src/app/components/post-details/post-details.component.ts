import {Component, Inject, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/Post';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: Post;

  constructor(public postService: PostService,
              public dialogRef: MatDialogRef<PostDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Post) {
  }

  ngOnInit() {
    this.postService.getPostById(this.data.id).subscribe(value => {
      this.post = value;
      console.log(this.post);
    });
  }

  onClick() {
    this.dialogRef.close();
  }
}
