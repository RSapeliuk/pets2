import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/User';
import {log} from 'util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080';
  $isLogined = new Subject();
  $authUser = new Subject();

  constructor(public http: HttpClient) {
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.url + '/authUser', {headers: new HttpHeaders({'Authorization': localStorage.getItem('token')})});
  }

  isLogined(login) {
    setTimeout(() => {
      this.$isLogined.subscribe((value) => {
        if (value != null) {
          console.log(value);
          login = value;
          // localStorage.setItem('isLogined', login);
          return login;
        } else {
          return null;
        }
      });
    }, 500);
  }
  logout() {
    localStorage.clear();
  }

}
