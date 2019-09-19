import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
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

}
