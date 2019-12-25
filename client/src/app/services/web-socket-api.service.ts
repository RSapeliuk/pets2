import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {ErrorObserver } from 'rxjs';

import { Message } from '../models/message';
import {ApiService} from './api.service';

@Injectable()
export class WebSocketApiService {


  constructor(private http: HttpClient,
              public apiService: ApiService) { }

  post(data: Message) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post(this.apiService.apiUrl, data, {headers});
  }
}
