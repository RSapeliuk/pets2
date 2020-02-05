import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {RegisterUserService} from '../../services/register-user.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {UuidService} from '../../services/uuid.service';
import {Router} from '@angular/router';
import {LoginUserService} from '../../services/login-user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = new User();
  file: File;
  imagePreview: string | ArrayBuffer;
  avatar: any;
  returnedUser: User;

  constructor(public registerUserService: RegisterUserService,
              public imageService: ImageUploadService,
              public uuidService: UuidService,
              public router: Router,
              public loginService: LoginUserService) {
  }

  ngOnInit() {
  }

  sendForm() {

    this.user.avatar = this.uuidService.randomName(this.avatar, this.file, this.user.avatar);

    if (this.file != null) {
      this.imageService.uploadUserAvatar(this.file, this.user.avatar).subscribe(value => {
      });
    }
    this.registerUserService.saveUser(this.user).subscribe(value => {
     // this.router.navigateByUrl('/');
      this.returnedUser = value;
    });

    setTimeout(() => {
      this.loginService.loginUser(this.user).subscribe(response => {
        const token = response.headers.get('Authorization');
        localStorage.setItem('token', token);
        location.reload();
      });
    }, 1000);

  }

  onPhotoUpload(event: any) {
    const image = event.target.files[0];
    this.file = image;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(image);
  }
}
