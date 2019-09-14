import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../models/Post';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(public http: HttpClient) {
  }

  url = 'http://localhost:8080/';


  savePost(userPost: Post, user: User, formdata: FormData): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(this.url + 'user/' + user.id + '/addPost', userPost, {headers});
  }
}


