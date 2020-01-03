import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../models/Post';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {Pet} from '../models/Pet';
import {Location} from '../models/Location';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {addParams} from '../helpers/addQueryParams';
import {District} from '../models/District';
import {City} from '../models/City';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(public http: HttpClient,
              public apiService: ApiService) {
  }
  savePost(userPost: Post, user: User, district: District) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<Post>(this.apiService.apiUrl
      + '/user/' + user.id + '/addPost/' + district.id, userPost, {headers});
  }

  savePostWithPet(userPost: Post, user: User, pet: Pet, district: District): Observable<Post> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<Post>(this.apiService.apiUrl +
      '/user/' + user.id + '/addPost/' + pet.id + '/' + district.id, userPost, {headers});
  }


  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiService.apiUrl + '/posts', {withCredentials: true});
  }

  getPostById(id): Observable<Post> {
    return this.http.get<Post>(this.apiService.apiUrl + '/post' + '/' + id);
  }

  getAllUserPostsById(user: User): Observable<Post[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.get<Post[]>(this.apiService.apiUrl + '/user' + '/' + user.id + '/posts', {headers});
  }

  getCity(): Observable<City[]> {
    return this.http.get<City[]>(this.apiService.apiUrl + '/getCity');
  }

  getDistricts(): Observable<District[]> {
    return this.http.get<District[]>(this.apiService.apiUrl + '/getDistricts');
  }

  isEnabled(id, enabled: boolean): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.put<any>(this.apiService.apiUrl + '/admin/isEnabled/' + id, enabled, {headers});
  }

  getFilteredPosts(query: {}): Observable<Post[]> {
    const url = addParams(this.apiService.apiUrl, query);
    console.log(url);
    return this.http.get<Post[]>(url);
  }
}


