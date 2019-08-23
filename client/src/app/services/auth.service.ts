import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = '/authUser';

  constructor(public http: HttpClient) {
  }

  auth(): Observable<User> {
    return this.http.get<User>(this.url, {headers: new HttpHeaders({'Authorization': localStorage.getItem('token')})});
  }

}
