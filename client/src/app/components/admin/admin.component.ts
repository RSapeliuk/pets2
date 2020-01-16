import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Role} from '../../models/enums/Role';
import {PostService} from '../../services/post.service';
import {City} from '../../models/City';
import {District} from '../../models/District';
import {LocationService} from '../../services/location.service';

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
  cities: City[];
  selectedCity: City;
  city: City = new City();
  district: District = new District();

  constructor(public adminService: AdminService,
              public postService: PostService,
              public locationService: LocationService) {
  }

  ngOnInit() {
    this.adminService.getUsers().subscribe(value => {
      this.dataSource = value;
    });
    this.postService.getAllPosts().subscribe(value => this.postSource = value);
    this.postService.getCity().subscribe(value => this.cities = value);
  }

  changeUserRole(role, id) {
    this.adminService.changeUserRole(role, id).subscribe();
  }

  isEnabled(id, enabled) {
    this.postService.isEnabled(id, enabled).subscribe();
  }

  saveCity() {
    this.locationService.saveCity(this.city).subscribe(value => console.log(value));
  }

  saveDistrict() {
    this.locationService.saveDistrict(this.selectedCity.id, this.district).subscribe(value => console.log(value));
  }
}
