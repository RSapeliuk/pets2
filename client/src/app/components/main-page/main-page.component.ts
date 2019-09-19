import {Component, OnInit} from '@angular/core';
import {LoginationComponent} from '../logination/logination.component';

import {PostService} from '../../services/post.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ImageUploadService} from '../../services/image-upload.service';
import {Post} from '../../models/Post';

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
    this.postService.getAllPosts().subscribe(value => {
      this.posts = value;
      console.log(this.posts);
    });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(LoginationComponent, dialogConfig);
  }

}
