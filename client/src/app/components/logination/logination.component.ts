import { Component, OnInit } from '@angular/core';
import {LoginUserService} from '../../services/login-user.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-logination',
  templateUrl: './logination.component.html',
  styleUrls: ['./logination.component.css']
})
export class LoginationComponent implements OnInit {
  user: User = new User();
  constructor(public loginUserService: LoginUserService) { }

  ngOnInit() {
  }
 login() {
   // tslint:disable-next-line:max-line-length
    this.loginUserService.loginUser(this.user).subscribe(response => {const token = response.headers.get('Authorization');
                                                                      console.log(token);
                                                                      localStorage.setItem('token', token); });
 }

}
