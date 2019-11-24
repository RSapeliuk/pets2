import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Role} from '../../models/enums/Role';
import {PostService} from '../../services/post.service';
import {Location} from '../../models/Location';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'name', 'surname', 'email', 'phoneNumber', 'role'];
  displayedPostColumns: string[] = ['id', 'title', 'kind', 'date', 'expirationDate', 'pet', 'user', 'price', 'enabled'];
  dataSource;
  postSource;
  roles: Role[] = [Role.ROLE_USER, Role.ROLE_ADMIN];
  location: Location;

  constructor(public adminService: AdminService, public postService: PostService) {
  }

  ngOnInit() {
    this.adminService.getUsers().subscribe(value => {
      this.dataSource = value;
    });
    this.postService.getAllPosts().subscribe(value => this.postSource = value);
    // this.postService.getLocation(this.postSource).subscribe(value => this.location = value);
  }

  changeUserRole(role, id) {
    this.adminService.changeUserRole(role, id).subscribe();
  }
  isEnabled(id, enabled){
    this.postService.isEnabled(id, enabled).subscribe();
  }
}
