import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostService} from './post.service';
import {Post} from '../models/Post';
import {User} from '../models/User';
import {ApiService} from './api.service';


@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {


  constructor(private http: HttpClient,
              private apiService: ApiService) {
  }

  uploadImage(file: File, uuid): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post(this.apiService.apiUrl + '/addPhoto', formData, {headers});
  }
  uploadUserAvatar(file: File, uuid): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    // const token = localStorage.getItem('token');
    // let headers = new HttpHeaders();
    // headers = headers.append('Authorization', token);
    return this.http.post(this.apiService.apiUrl + '/addAvatar', formData);
  }
  updateUserAvatar(file: File, uuid, user: User): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post(this.apiService.apiUrl + '/updateAvatar/' + user.id, formData);
  }
  uploadPetPhoto(file: File, uuid): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post(this.apiService.apiUrl + '/addPetPhoto', formData, {headers});
  }
}
