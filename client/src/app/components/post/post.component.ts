import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {ImageUploadService} from '../../services/image-upload.service';
import {Router} from '@angular/router';
import {LoginationComponent} from '../logination/logination.component';
import {NgForm} from '@angular/forms';
import * as uuid from 'uuid';
import {UuidService} from '../../services/uuid.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post = new Post();
  user: User;
  file: File;
  namePhoto: any;
  imagePreview: string | ArrayBuffer = '';

  constructor(public postService: PostService,
              public authService: AuthService,
              public router: Router,
              public imageService: ImageUploadService,
              public uuidService: UuidService) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(value => {
      this.user = value;
      console.log(this.user);
    });
  }

  savePost(form: NgForm) {
    console.log(form.value);
    this.post.photo = this.uuidService.randomName(this.namePhoto, this.file, this.post.photo);
    this.imageService.uploadImage(this.file, this.post.photo).subscribe(value => {
      console.log(value);
    });
    this.postService.savePost(this.post, this.user).subscribe(value => {
        console.log(value);
        this.router.navigateByUrl('/');
      }
    );
  }

  onFileUpload(event: any) {
    const image = event.target.files[0];
    this.file = image;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(image);
  }
}

