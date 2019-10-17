import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {ImageUploadService} from '../../services/image-upload.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UuidService} from '../../services/uuid.service';
import {Kind} from '../../models/enums/Kind';
import {PetService} from '../../services/pet.service';
import {Pet} from '../../models/Pet';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post = new Post();
  user: User;
  file: File;
  kind: Kind[] = [Kind.LEAVE, Kind.GIVE];
  namePhoto: any;
  imagePreview: string | ArrayBuffer = '';
  pets: Pet[] = [];

  constructor(public postService: PostService,
              public authService: AuthService,
              public router: Router,
              public imageService: ImageUploadService,
              public uuidService: UuidService,
              public petService: PetService) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(value => {
      this.user = value;
      console.log(this.user);
    });
    setTimeout(() => {
      this.petService.getPets(this.user).subscribe(value => {
        console.log(value);
        this.pets = value;
      });
    }, 500);
  }

  savePost(form: NgForm) {
    console.log(form.value);
    this.post.photo = this.uuidService.randomName(this.namePhoto, this.file, this.post.photo);
    if (this.file != null) {
      this.imageService.uploadImage(this.file, this.post.photo).subscribe(value => {
        console.log(value);
      });
    }
    this.postService.savePost(this.post, this.user, this.post.pet).subscribe(value => {
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

