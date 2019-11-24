import {Component, OnInit} from '@angular/core';

import {PostService} from '../../services/post.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ImageUploadService} from '../../services/image-upload.service';
import {PostDetailsComponent} from '../post-details/post-details.component';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {DistrictsKyiv} from '../../models/enums/DistrictsKyiv';
import {DistrictsLviv} from '../../models/enums/DistrictsLviv';
import {Cities} from '../../models/enums/Cities';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  posts = [];
  user: User;
  selectedCity: string;
  cities = Object.values(Cities).map(key => Cities[key]).filter(value => typeof value === 'string');
  districtsLviv = DistrictsLviv;
  districtsKyiv = DistrictsKyiv;
  districtsLvivEnumName = ['SHEVCHENKIVSKY',
    'LYCHAKIVSKY',
    'SYHIV',
    'FRANKIVSKY',
    'ZALIZNYCHNY',
    'GALICKYI'];
  districtsKyivEnumName = ['DESNIANSKIY',
    'SVIATOSHYNSKIY',
    'DNIPROVSKIY',
    'PECHERSKIY',
    'GOLOSIIVSKIY',
    'DARNYCKIY',
    'SOLOMIANSKIY',
    'OBOLONSKIY',
    'SHEVCHENKIVSKIY',
    'PODILSKIY'];

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
        console.log(this.posts);
      });
    }, 0);
    this.authService.getUser().subscribe(value => this.user = value);
    this.activatedRoute.queryParamMap.subscribe((res: any) => {
      if (res.params.districtLviv) {
        this.queryParamsDistrictLviv = res.params.districtLviv;
        console.log(this.queryParamsDistrictLviv);
      }
      if (res.params.districtKyiv) {
        this.queryParamsDistrictKyiv = res.params.districtKyiv;
        console.log(this.queryParamsDistrictKyiv);
      }
      console.log(res.params);
    });
    // console.log(this.districtsLvivEnumName);
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

  checkedCity(city) {
    console.log(city);
    if (this.isChecked === true) {
      this.selectedCity = city;
    }
  }

  addParamsToQuery(query) {
    if (query.districtLviv) {
      if (this.queryParamsDistrictLviv) {
        this.queryParamsDistrictLviv += ',' + query.districtLviv;
        query.districtLviv = [this.queryParamsDistrictLviv];
      }
    }
    if (query.districtKyiv) {
      if (this.queryParamsDistrictKyiv) {
        this.queryParamsDistrictKyiv += ',' + query.districtKyiv;
        query.districtKyiv = [this.queryParamsDistrictKyiv];
      }
    }
    if (this.isChecked === true) {
      this.router.navigate([], {
        queryParams: query,
        queryParamsHandling: 'merge'
      });
    }
  }
}
