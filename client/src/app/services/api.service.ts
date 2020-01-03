import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // apiUrl = 'http://localhost:8080';
  apiUrl = 'http://ec2-3-15-232-5.us-east-2.compute.amazonaws.com:8080';


  constructor() { }
}
