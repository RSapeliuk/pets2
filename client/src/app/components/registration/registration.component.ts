import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {RegisterUserService} from '../../services/register-user.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {UuidService} from '../../services/uuid.service';
import {Location} from '../../models/Location';
import {Router} from '@angular/router';

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
  userLocation: Location = new Location();
  cities: string[] = ['ЛЬВІВ', 'КИЇВ'];
  isValid = false;
  districtsLviv: string[] = ['ШЕВЧЕНКІВСЬКИЙ',
    'ЛИЧАКІВСЬКИЙ',
    'СИХІВСЬКИЙ',
    'ФРАНКІВСЬКИЙ',
    'ЗАЛІЗНИЧНИЙ',
    'ГАЛИЦЬКИЙ'];
  districtsKyiv: string[] = ['ДЕСНЯНСЬКИЙ',
    'СВЯТОШИНСЬКИЙ',
    'ДНІПРОВСЬКИЙ',
    'ПЕЧЕРСЬКИЙ',
    'ГОЛОСІЇВСЬКИЙ',
    'ДАРНИЦЬКИЙ',
    'СОЛОМЯНСЬКИЙ',
    'ОБОЛОНСЬКИЙ',
    'ШЕВЧЕНКІСЬКИЙ',
    'ПОДІЛЬСЬКИЙ'];

  constructor(public registerUserService: RegisterUserService,
              public imageService: ImageUploadService,
              public uuidService: UuidService,
              public router: Router) {
  }

  ngOnInit() {
  }

  sendForm() {
    if (this.isValid === true) {
      this.user.avatar = this.uuidService.randomName(this.avatar, this.file, this.user.avatar);

      if (this.file != null) {
        this.imageService.uploadUserAvatar(this.file, this.user.avatar).subscribe(value => {
          console.log(value);
        });
      }
      this.registerUserService.saveUser(this.user).subscribe(value => {
        console.log(value);
        this.router.navigateByUrl('/');
      });
      setTimeout(() => {
        this.registerUserService.saveLocation(this.userLocation, this.user).subscribe(value => console.log(value));
      }, 1000);
    }
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
