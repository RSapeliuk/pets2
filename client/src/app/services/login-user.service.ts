import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  url = '/login';

  constructor(public http: HttpClient) {

  }

  loginUser(loginUser: User) {
    return this.http.post(this.url, loginUser, {observe: 'response', responseType: 'text'});
  }
}
