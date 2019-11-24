import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  URL = 'http://localhost:8080';

  constructor(public http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.get<User[]>(this.URL + '/users', {headers});
  }

  changeUserRole(role, id): Observable<any> {
    console.log(typeof role);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.put(this.URL + '/admin' + '/changeUserRole' + '/' + id, role, {headers});
  }
}
