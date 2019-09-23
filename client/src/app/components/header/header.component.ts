import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoginationComponent} from '../logination/logination.component';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogined: any = false;
  logined: any;
  user: User;

  constructor(public dialog: MatDialog,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.$isLogined.subscribe((value) => {
      if (value != null) {
        console.log(value);
        this.isLogined = value;
        localStorage.setItem('isLogined', this.isLogined);
      }
    });
    this.authService.getUser().subscribe(value => this.user = value);
    this.logined = localStorage.getItem('isLogined');
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(LoginationComponent, dialogConfig);
  }

}
