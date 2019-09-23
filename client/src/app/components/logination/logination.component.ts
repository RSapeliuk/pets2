import {Component, Inject, OnInit} from '@angular/core';
import {LoginUserService} from '../../services/login-user.service';
import {User} from '../../models/User';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-logination',
  templateUrl: './logination.component.html',
  styleUrls: ['./logination.component.css']
})
export class LoginationComponent implements OnInit {
  user: User = new User();
  returnedUser: User;

  constructor(public loginUserService: LoginUserService,
              public router: Router,
              public dialogRef: MatDialogRef<LoginationComponent>,
              public authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.loginUserService.loginUser(this.user).subscribe(response => {
        const token = response.headers.get('Authorization');
        console.log(token);
        localStorage.setItem('token', token);
        if (token != null) {
          this.authService.$isLogined.next(true);
          this.authService.getUser().subscribe(value => {
            this.returnedUser = value;
            this.authService.$authUser.next(value);
            console.log(this.returnedUser);
            // @ts-ignore
            if (this.returnedUser.roles[0] === 'ROLE_USER' && this.authService.$isLogined.next(true)) {
              this.router.navigateByUrl(`/`);
            } else { // @ts-ignore
              // @ts-ignore
              if (this.returnedUser.roles[0] === 'ROLE_ADMIN' && this.authService.$isLogined.next(true)) {
                this.router.navigateByUrl(`/admin/${this.returnedUser.id}`);
              }
            }
          });
        }
      }
    );
  }


  onSubmit() {
    this.dialogRef.close();
  }
}
