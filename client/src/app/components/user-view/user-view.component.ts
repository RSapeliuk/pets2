import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/Post';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Pet} from '../../models/Pet';
import {PetComponent} from '../pet/pet.component';
import {PetService} from '../../services/pet.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  user: User;
  userPosts: Post[];
  userPets: Pet[];

  constructor(public authUser: AuthService, public postService: PostService, public dialog: MatDialog, public petService: PetService) {
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
}
