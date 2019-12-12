import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostService} from './post.service';
import {Post} from '../models/Post';
import {User} from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  uploadImage(file: File, uuid): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post(this.apiURL + '/addPhoto', formData, {headers});
  }
  uploadUserAvatar(file: File, uuid): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    // const token = localStorage.getItem('token');
    // let headers = new HttpHeaders();
    // headers = headers.append('Authorization', token);
    return this.http.post(this.apiURL + '/addAvatar', formData);
  }
  updateUserAvatar(file: File, uuid, user: User): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post(this.apiURL + '/updateAvatar/' + user.id, formData);
  }
  uploadPetPhoto(file: File, uuid): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post(this.apiURL + '/addPetPhoto', formData, {headers});
  }
}
