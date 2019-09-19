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

  url = 'http://localhost:8080';


  savePost(userPost: Post, user: User): Observable<Post> {
    const headers: HttpHeaders = new HttpHeaders();

    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.post<Post>(this.url + '/user/' + user.id + '/addPost', userPost, {headers});
  }

  getAllPosts() {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.get<any>(this.url + '/posts',{headers});
  }
  getPostById() {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.get<any>(this.url + '/posts',{headers});
  }
}


