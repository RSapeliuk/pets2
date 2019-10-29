import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/Post';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Pet} from '../../models/Pet';
import {PetComponent} from '../pet/pet.component';
import {PetService} from '../../services/pet.service';
import {NgForm} from '@angular/forms';
import {PostDetailsComponent} from '../post-details/post-details.component';

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
  pet: Pet;

  constructor(public authUser: AuthService,
              public postService: PostService,
              public dialog: MatDialog,
              public petService: PetService) {
  }

  ngOnInit() {
    this.authUser.getUser().subscribe(value => {
      console.log(value);
      this.user = value;
    });
    setTimeout(() => {
      this.postService.getAllUserPostsById(this.user).subscribe(value => {
        this.userPosts = value;
      });
      this.petService.getPets(this.user).subscribe(value => this.userPets = value);
    }, 1000);
  }

  onClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(PetComponent, dialogConfig);
  }

  updateUser() {
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
      console.log(value);
    });
  }
  postDetails(post) {
    console.log(post);
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
