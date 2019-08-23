import {Component, Inject, OnInit} from '@angular/core';
import {LoginUserService} from '../../services/login-user.service';
import {User} from '../../models/User';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/typings/dialog';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {decode} from 'punycode';

@Component({
  selector: 'app-logination',
  templateUrl: './logination.component.html',
  styleUrls: ['./logination.component.css']
})
export class LoginationComponent implements OnInit {
  user: User = new User();
  isLogined = false;
  constructor(public loginUserService: LoginUserService, public router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.loginUserService.loginUser(this.user).subscribe(response => {
      const token = response.headers.get('Authorization');
      console.log(token);
      localStorage.setItem('token', token);
      this.router.navigateByUrl('/');
      if (token != null) {
        this.isLogined = true;
      }
    });
  }
}
