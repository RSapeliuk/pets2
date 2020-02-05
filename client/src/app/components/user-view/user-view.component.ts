import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/Post';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Pet} from '../../models/Pet';
import {PetComponent} from '../pet/pet.component';
import {PetService} from '../../services/pet.service';
import {PostDetailsComponent} from '../post-details/post-details.component';
import {ImageUploadService} from '../../services/image-upload.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  user: User;
  userPosts: Post[];
  userPets: Pet[];
  editable = false;
  size: string[] = ['МАЛЕНЬКИЙ', 'СЕРЕДНІЙ', 'ВЕЛИКИЙ'];
  hairLength: string[] = ['КОРОТКА', 'СЕРЕДНЯ', 'ДОВГА'];
  pet: Pet;
  file: File;

  constructor(public authUser: AuthService,
              public postService: PostService,
              public dialog: MatDialog,
              public petService: PetService,
              public imageService: ImageUploadService) {
  }

  ngOnInit() {
    this.authUser.getUser().subscribe(value => {
      this.user = value;
    });
    setTimeout(() => {
      this.postService.getAllUserPostsById(this.user).subscribe(value => {
        this.userPosts = value;
      });
      this.petService.getPets(this.user).subscribe(value => this.userPets = value);
    }, 500);
  }

  onClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(PetComponent, dialogConfig);
  }

  updateUser() {
    if (this.file != null) {
      this.imageService.updateUserAvatar(this.file, this.user.avatar, this.user).subscribe(value => {
      });
    }
    this.authUser.updateUser(this.user).subscribe(value => console.log(value));
    this.editable = false;
  }

  cancelEdit() {
    this.editable = false;
  }

  editUser() {
    this.editable = true;
  }

  updatePet() {
    this.petService.updatePet(this.pet).subscribe(value => console.log(value));
  }

  getOnePet(id) {
    this.petService.getOnePet(id).subscribe(value => {
      this.pet = value;
    });
  }
  postDetails(post) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '99%';
    dialogConfig.height = '99%';
    dialogConfig.data = {
      id: post.id
    };
    this.dialog.open(PostDetailsComponent, dialogConfig);
  }
}
