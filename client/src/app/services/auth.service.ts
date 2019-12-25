import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {ApiService} from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient,
              public apiService: ApiService) {
  }

  getUser(): Observable<User> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.get<User>(this.apiService.apiUrl + '/authUser', {headers});
  }

  logout() {
    localStorage.clear();
  }

  updateUser(user: User): Observable<User> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.put<User>(this.apiService.apiUrl + '/edit/' + user.id, user,
      {headers});
  }

  updateUserRating(user: any, rating): Observable<any> {
    return this.http.put<any>(this.apiService.apiUrl + '/rating/' + user.id, rating);
  }
}
