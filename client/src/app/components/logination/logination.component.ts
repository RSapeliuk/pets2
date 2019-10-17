import {Component, Inject, OnInit} from '@angular/core';
import {LoginUserService} from '../../services/login-user.service';
import {User} from '../../models/User';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-logination',
  templateUrl: './logination.component.html',
  styleUrls: ['./logination.component.css']
})
export class LoginationComponent implements OnInit {
  user: User = new User();
  returnedUser: User;
  isLogined: any;

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
          this.isLogined = true;
          localStorage.setItem('isLogined', this.isLogined);
          this.authService.getUser().subscribe(value => {
            this.returnedUser = value;
            console.log(this.returnedUser);
            if (this.returnedUser.role === 'ROLE_USER') {
              this.router.navigateByUrl(`/`);
            } else {
              if (this.returnedUser.role === 'ROLE_ADMIN') {
                this.router.navigateByUrl(`/admin/${this.returnedUser.id}`);
              }
            }
          });
          window.location.reload();
        }
      }
    );
  }


  onSubmit() {
    this.dialogRef.close();
  }
}
