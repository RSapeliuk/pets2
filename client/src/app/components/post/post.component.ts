import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {ImageUploadService} from '../../services/image-upload.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post = new Post();
  user: User;
  formData = new FormData();
  file: any;

  constructor(public postService: PostService,
              public authService: AuthService,
              public imageService: ImageUploadService,
              public router: Router) { }

  ngOnInit() {
    this.authService.auth().subscribe(value => {
      this.user = value;
      console.log(this.user);
    });
  }

  handleImage(Event) {
    this.file = Event.target.files[0];
    this.formData.append('file', this.file);
    console.log(this.file);
  }

  savePost() {
    // this.post.photo = this.selectedFile;
    console.log(this.formData);
    this.postService.savePost(this.post, this.user, this.formData).subscribe(value => {
        console.log(value);
        this.router.navigateByUrl('/');
      }
    );
    console.log(this.user);
  }
}

