import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {ErrorObserver } from 'rxjs';

import { Message } from '../models/message';

@Injectable()
export class WebSocketApiService {
  url = 'http://localhost:8080/api/socket';

  constructor(private http: HttpClient) { }

  post(data: Message) {
    return this.http.post(this.url, data);
  }
}
