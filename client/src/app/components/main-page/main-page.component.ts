import {Component, OnInit} from '@angular/core';

import {PostService} from '../../services/post.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ImageUploadService} from '../../services/image-upload.service';
import {PostDetailsComponent} from '../post-details/post-details.component';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {DistrictsKyiv} from '../../models/enums/DistrictsKyiv';
import {DistrictsLviv} from '../../models/enums/DistrictsLviv';
import {ActivatedRoute, Router} from '@angular/router';
import {Kind} from '../../models/enums/Kind';
import {City} from '../../models/City';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  posts = [];
  user: User;
  selectedCity: City;
  typeEnum = ['Залишити', 'Віддати'];
  type = Kind;
  typeOf: any;
  cities: City[];
  districtsLviv = DistrictsLviv;
  districtsKyiv = DistrictsKyiv;
  arr = [];
  districtsLvivEnumName = [
    {value: 'SHEVCHENKIVSKY', checked: false},
    {value: 'LYCHAKIVSKY', checked: false},
    {value: 'SYHIV', checked: false},
    {value: 'FRANKIVSKY', checked: false},
    {value: 'ZALIZNYCHNY', checked: false},
    {value: 'GALICKYI', checked: false}];
  districtsKyivEnumName = [
    {value: 'DESNIANSKIY', checked: false},
    {value: 'SVIATOSHYNSKIY', checked: false},
    {value: 'DNIPROVSKIY', checked: false},
    {value: 'PECHERSKIY', checked: false},
    {value: 'GOLOSIIVSKIY', checked: false},
    {value: 'DARNYCKIY', checked: false},
    {value: 'SOLOMIANSKIY', checked: false},
    {value: 'OBOLONSKIY', checked: false},
    {value: 'SHEVCHENKIVSKIY', checked: false},
    {value: 'PODILSKIY', checked: false}];

  isChecked = true;
  queryParamsDistrictLviv: string;
  queryParamsDistrictKyiv: string;

  constructor(public postService: PostService,
              public dialog: MatDialog,
              public imageService: ImageUploadService,
              public authService: AuthService,
              public activatedRoute: ActivatedRoute,
              public router: Router) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.postService.getAllPosts().subscribe(value => {
        this.posts = value;
      });
    }, 500);
    this.postService.getCity().subscribe(value => {
      this.cities = value;
    });
    if (localStorage.getItem('token')) {
      this.authService.getUser().subscribe(value => {
          this.user = value;
      });
    }
    this.activatedRoute.queryParamMap.subscribe((res: any) => {
      if (res.params.city) {

      }
      if (res.params.district) {
        this.queryParamsDistrictLviv = res.params.district;
        const arr = this.queryParamsDistrictLviv.split(',');
        for (const str of arr) {
          this.districtsLvivEnumName.forEach(el => {
            if (el.value === str) {
              el.checked = true;
            }
          });
        }
      }
      if (res.params.districtKyiv) {
        this.queryParamsDistrictKyiv = res.params.districtKyiv;
        const arr = this.queryParamsDistrictKyiv.split(',');
        for (const str of arr) {
          this.districtsKyivEnumName.forEach(el => {
            if (el.value === str) {
              el.checked = true;
            }
          });
        }
      }
      this.getPost(res.params);
    });
  }

  postDetails(post) {
    console.log(post);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '99%';
    dialogConfig.height = '80%';
    dialogConfig.data = {
      id: post.id
    };
    this.dialog.open(PostDetailsComponent, dialogConfig);
  }

  addParamsToQuery(query) {
    if (query.district) {
      let arr = [];
      if (this.queryParamsDistrictLviv) {
        arr = this.queryParamsDistrictLviv.split(',');
        this.queryParamsDistrictLviv = '';
        const index = arr.indexOf(query.district.value);
        if (index > -1) {
          arr.splice(index, 1);
          this.districtsLvivEnumName[query.district.index].checked = false;
        } else {
          arr.push(query.district.value);
        }
      } else {
        arr.push(query.district.value);
      }
      query.district = arr.join(',');
      if (arr.length === 0) {
        query.district = null;
      }
    }
    if (query.districtKyiv) {
      let arr = [];
      if (this.queryParamsDistrictKyiv) {
        arr = this.queryParamsDistrictKyiv.split(',');
        this.queryParamsDistrictKyiv = '';
        const index = arr.indexOf(query.districtKyiv.value);
        if (index > -1) {
          arr.splice(index, 1);
          this.districtsKyivEnumName[query.districtKyiv.index].checked = false;
        } else {
          arr.push(query.districtKyiv.value);
        }
      } else {
        arr.push(query.districtKyiv.value);
      }
      query.districtKyiv = arr.join(',');
      if (arr.length === 0) {
        query.districtKyiv = null;
      }
    }
    if (this.isChecked === true) {
      this.router.navigate([], {
        queryParams: query,
        queryParamsHandling: 'merge'
      });
    }
  }

  getPost(query: {}) {
    this.postService.getFilteredPosts(query).subscribe((res) => {
      this.posts = res;
    });
  }
}
