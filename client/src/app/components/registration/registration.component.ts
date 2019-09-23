import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {RegisterUserService} from '../../services/register-user.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {UuidService} from '../../services/uuid.service';

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

  constructor(public registerUserService: RegisterUserService,
              public imageService: ImageUploadService,
              public uuidService: UuidService) {
  }

  ngOnInit() {
  }

  sendForm() {
    this.user.avatar = this.uuidService.randomName(this.avatar, this.file, this.user.avatar);
    this.imageService.uploadUserAvatar(this.file, this.user.avatar).subscribe(value => {
      console.log(value);
    });
    this.registerUserService.saveUser(this.user).subscribe(value => console.log(value));
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
