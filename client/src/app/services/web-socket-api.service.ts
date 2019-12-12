import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {ErrorObserver } from 'rxjs';

import { Message } from '../models/message';

@Injectable()
export class WebSocketApiService {
  url = 'http://localhost:8080/api/socket';

  constructor(private http: HttpClient) { }

  post(data: Message) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post(this.url, data, {headers});
  }
}
