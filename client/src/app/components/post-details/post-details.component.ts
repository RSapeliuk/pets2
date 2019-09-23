import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/Post';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
post: Post;
  constructor(public postService: PostService,
              public dialogRef: MatDialogRef<PostDetailsComponent>,
  ) { }

  ngOnInit() {
    //this.postService.getPostById(this.post);
  }
 onClick() {
    this.dialogRef.close();
 }
}
