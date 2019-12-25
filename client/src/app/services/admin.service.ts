import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient,
              public apiService: ApiService) {
  }

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.get<User[]>(this.apiService.apiUrl + '/users', {headers});
  }

  changeUserRole(role, id): Observable<any> {
    console.log(typeof role);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.put(this.apiService.apiUrl + '/admin' + '/changeUserRole' + '/' + id, role, {headers});
  }
}
