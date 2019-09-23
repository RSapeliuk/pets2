import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostService} from './post.service';
import {Post} from '../models/Post';


@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient, public postService: PostService) {
  }

  uploadImage(file: File, uuid): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    return this.http.post(this.apiURL + '/addPhoto', formData);
  }
  uploadUserAvatar(file: File, uuid): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    return this.http.post(this.apiURL + '/addAvatar', formData);
  }
}
