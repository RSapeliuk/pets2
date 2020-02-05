import {Component, OnInit} from '@angular/core';
import {PetService} from '../../services/pet.service';
import {Pet} from '../../models/Pet';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';
import {MatDialogRef} from '@angular/material';
import {ImageUploadService} from '../../services/image-upload.service';
import {UuidService} from '../../services/uuid.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  pet: Pet = new Pet();
  user: User;
  size: string[] = ['МАЛЕНЬКИЙ', 'СЕРЕДНІЙ', 'ВЕЛИКИЙ'];
  hairLength: string[] = ['КОРОТКА', 'СЕРЕДНЯ', 'ДОВГА'];
  file: File;
  type: string[] = ['КІТ', 'ПЕС', 'ПТАХ'];
  petPreview: string | ArrayBuffer = '';
  name: any;

  constructor(public petService: PetService,
              public authService: AuthService,
              public dialogRef: MatDialogRef<PetComponent>,
              public imageService: ImageUploadService,
              public uuidService: UuidService) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(value => {
      this.user = value;
    });
  }

  savePet() {
    this.pet.photo = this.uuidService.randomName(this.name, this.file, this.pet.photo);
    if (this.file != null) {
      this.imageService.uploadPetPhoto(this.file, this.pet.photo).subscribe(value => {
      });
    }
    this.petService.savePet(this.pet, this.user).subscribe(value => console.log(value));
  }

  onSubmit() {
    this.dialogRef.close();
  }

  onPetPhotoUpload(event: any) {
    const image = event.target.files[0];
    this.file = image;
    const reader = new FileReader();
    reader.onload = () => {
      this.petPreview = reader.result;
    };
    reader.readAsDataURL(image);
  }
}
