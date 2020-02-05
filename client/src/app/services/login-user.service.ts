import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {


  constructor(public http: HttpClient,
              private apiService: ApiService) {

  }

  loginUser(loginUser: User) {
    return this.http.post(this.apiService.apiUrl + '/login', loginUser, {observe: 'response'});
  }
}
