import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {Location} from '../models/Location';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  URL = 'http://localhost:8080/';

  constructor(public http: HttpClient) {
  }

  saveUser(someUser: User): Observable<User> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<User>(this.URL + 'signup', someUser);
  }

  
  
}
