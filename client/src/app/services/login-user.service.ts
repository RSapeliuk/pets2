import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  url = 'http://localhost:8080';

  constructor(public http: HttpClient) {

  }

  loginUser(loginUser: User) {
    return this.http.post(this.url + '/login', loginUser, {observe: 'response'});
  }
}
