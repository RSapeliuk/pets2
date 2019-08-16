import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {NgForm} from '@angular/forms';
import {RegisterUserService} from '../../services/register-user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = new User();

  constructor(public registerUserService: RegisterUserService) {
  }

  ngOnInit() {
  }

  sendForm() {
    this.registerUserService.saveUser(this.user).subscribe(value => console.log(value));
  }
}
