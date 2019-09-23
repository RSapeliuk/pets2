import {Component, OnInit} from '@angular/core';
import {LoginationComponent} from '../logination/logination.component';

import {PostService} from '../../services/post.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ImageUploadService} from '../../services/image-upload.service';
import {Post} from '../../models/Post';
import {PostDetailsComponent} from '../post-details/post-details.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
 posts = [];

  constructor(public postService: PostService, public dialog: MatDialog, public imageService: ImageUploadService) {
  }

  ngOnInit() {
    setTimeout(() => {this.postService.getAllPosts().subscribe(value => {
      this.posts = value;
      console.log(this.posts);
    }); }, 500);
  }



  postDetails(post) {
    console.log(post);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '99%';
    dialogConfig.height = '99%';
    this.dialog.open(PostDetailsComponent, dialogConfig);
  }
}
