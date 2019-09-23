import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoginationComponent} from '../logination/logination.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isLogined = false;
  constructor(public dialog: MatDialog,
              public authService: AuthService) { }

  ngOnInit() {
    this.authService.$isLogined.subscribe((value => {
      console.log(value);
      this.isLogined = value}));
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(LoginationComponent, dialogConfig);
  }

}
