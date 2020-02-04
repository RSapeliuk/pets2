import {Injectable} from '@angular/core';
import {Greeting} from '../models/Greeting';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable()
export class WebSocketApiService {
  url = this.apiService.apiUrl + '/api/socket';

  constructor(public http: HttpClient,
              public apiService: ApiService) {
  }

  post(data: Greeting) {
    return this.http.post(this.url, data)
      .pipe(map((data) => data));
  }

  getMessages(): Observable<Greeting[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.get<Greeting[]>(this.apiService.apiUrl + '/user/messages', {headers});
  }
}
