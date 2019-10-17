import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../models/Post';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {Pet} from '../models/Pet';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(public http: HttpClient) {
  }

  url = 'http://localhost:8080';


  savePost(userPost: Post, user: User, pet: Pet): Observable<Post> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.post<Post>(this.url + '/user/' + user.id + '/addPost/' + pet.id, userPost, {headers});
  }
  getAllPosts(): Observable<Post[]> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.get<Post[]>(this.url + '/posts', {headers});
  }
  getPostById(id): Observable<Post> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.get<Post>(this.url + '/post' + '/' + id, {headers});
  }
  getAllUserPostsById(user: User): Observable<Post[]> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.get<Post[]>(this.url + '/user' + '/' + user.id + '/posts', {headers});
  }
}


