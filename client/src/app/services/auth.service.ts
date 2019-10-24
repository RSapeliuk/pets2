import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080';

  constructor(public http: HttpClient) {
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.url + '/authUser', {headers: new HttpHeaders({'Authorization': localStorage.getItem('token')})});
  }

  logout() {
    localStorage.clear();
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/edit/' + user.id, user,
      {headers: new HttpHeaders({'Authorization': localStorage.getItem('token')})});
  }

  updateUserRating(user: any, rating): Observable<any> {
    return this.http.put<any>(this.url + '/rating/' + user.id, rating);
  }

}
