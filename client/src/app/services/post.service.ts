import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../models/Post';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {Pet} from '../models/Pet';
import {Location} from '../models/Location';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {addParams} from '../helpers/addQueryParams';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(public http: HttpClient) {
  }

  url = 'http://localhost:8080';


  savePost(userPost: Post, user: User): Observable<Post> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<Post>(this.url + '/user/' + user.id + '/addPost/', userPost, {headers});
  }

  savePostWithPet(userPost: Post, user: User, pet: Pet): Observable<Post> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<Post>(this.url + '/user/' + user.id + '/addPost/' + pet.id, userPost, {headers});
  }


  getAllPosts(): Observable<Post[]> {
    // const token = localStorage.getItem('token');
    // let headers = new HttpHeaders();
    // headers = headers.append('Authorization', token);
    return this.http.get<Post[]>(this.url + '/posts');
  }

  getPostById(id): Observable<Post> {
    // const token = localStorage.getItem('token');
    // let headers = new HttpHeaders();
    // headers = headers.append('Authorization', token);
    return this.http.get<Post>(this.url + '/post' + '/' + id);
  }

  getAllUserPostsById(user: User): Observable<Post[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.get<Post[]>(this.url + '/user' + '/' + user.id + '/posts', {headers});
  }

  saveLocation(postLocation: Location, post: Post): Observable<Location> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<Location>(this.url + '/addLocation/' + post.id, postLocation, {headers});
  }

  getLocation(post: Post): Observable<Location> {
    return this.http.get<Location>(this.url + '/getPostLocation/' + post.id);
  }

  isEnabled(id, enabled: boolean): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.put<any>(this.url + '/admin/isEnabled/' + id, enabled, {headers});
  }
  getFilteredPosts(query: {}): Observable<Post[]> {
    const url = addParams(this.url, query);
    console.log(url);
    return this.http.get<Post[]>(url);
  }
}


