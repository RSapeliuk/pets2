import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoginationComponent} from '../logination/logination.component';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logined: string | boolean;
  user: User;

  constructor(public dialog: MatDialog,
              public authService: AuthService,
              public router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.authService.getUser().subscribe(value => {
        this.user = value;
      });
    }
    this.logined = localStorage.getItem('token');

  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(LoginationComponent, dialogConfig);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
    setTimeout(() => {
      window.location.reload();
    }, 500);

  }

  reload() {
    this.router.navigateByUrl('/');
    setTimeout(() => {
      location.reload();
    }, 100);

  }

}
