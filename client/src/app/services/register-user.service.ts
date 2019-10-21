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
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.post<User>(this.URL + 'signup', someUser);
  }

  saveLocation(userLocation: Location, user: User): Observable<Location> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.post<Location>(this.URL + 'addLocation/' + user.id, userLocation, {headers});
  }
}
