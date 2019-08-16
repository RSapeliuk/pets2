import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
 URL = '/signup';
  constructor(public http: HttpClient) {
  }

  saveUser(someUser: User): Observable<User> {
    return this.http.post<User>(this.URL, someUser);
  }
}
