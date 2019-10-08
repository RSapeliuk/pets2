import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    return this.http.post<User>(this.URL + 'signup', someUser);
  }

  saveLocation(userLocation: Location, user: User): Observable<Location> {
    return this.http.post<Location>(this.URL + 'addLocation/' + user.id, userLocation);
  }
}
