import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/User';
import {Location} from '../models/Location';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080';

  constructor(public http: HttpClient) {
  }

  getUser(): Observable<User> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.get<User>(this.url + '/authUser', {headers});
  }

  logout() {
    localStorage.clear();
  }

  updateUser(user: User): Observable<User> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.put<User>(this.url + '/edit/' + user.id, user,
      {headers});
  }

  updateUserRating(user: any, rating): Observable<any> {
    return this.http.put<any>(this.url + '/rating/' + user.id, rating);
  }
}
