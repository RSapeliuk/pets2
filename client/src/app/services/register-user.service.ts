import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(public http: HttpClient,
              private apiService: ApiService) {
  }

  saveUser(someUser: User): Observable<User> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<User>(this.apiService.apiUrl + '/signup', someUser);
  }



}
