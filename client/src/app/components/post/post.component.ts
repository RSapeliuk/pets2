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
import {District} from '../../models/District';
import {City} from '../../models/City';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post = new Post();
  returnedPost: Post;
  user: User;
  file: File;
  kind: Kind[] = [Kind.LEAVE, Kind.GIVE];
  namePhoto: any;
  imagePreview: string | ArrayBuffer = '';
  pets: Pet[] = [];
  posts: Post[] = [];
  postCity;
  cities: City[] = [];
  districts: District[] = [];
  districtLviv = [];
  districtKyiv = [];
  postDistrict: District;

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
    this.postService.getCity().subscribe(value => {
      this.cities = value;
      console.log(this.cities);
    });
    this.postService.getDistricts().subscribe(value => {
      this.districts = value;
      console.log(this.districts);
      for (const district of this.districts) {
        if (district.city.name === 'ЛЬВІВ') {
          this.districtLviv.push(district);
        }
      }
      for (const district of this.districts) {
        if (district.city.name === 'КИЇВ') {
          this.districtKyiv.push(district);
        }
      }
    });
    setTimeout(() => {
      this.petService.getPets(this.user).subscribe(value => {
        console.log(value);
        this.pets = value;
      });
      this.postService.getAllPosts().subscribe(value => {
        console.log(value);
        this.posts = value;
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
    this.postService.savePost(this.post, this.user, this.post.postDistrict).subscribe(value => {
        console.log(value);
        this.returnedPost = value;
        this.router.navigateByUrl('/');
      }
    );
  }

  saveLocation() {
    // setTimeout(() => {
    //   this.postService.saveLocation(this.postDistrict, this.returnedPost).subscribe(value => console.log(value));
    // }, 500);

  }

  savePostWithPet(form: NgForm) {
    console.log(form.value);
    this.postService.savePostWithPet(this.post, this.user, this.post.pet, this.post.postDistrict).subscribe(value => {
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

