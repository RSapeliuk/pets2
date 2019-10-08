import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pet} from '../models/Pet';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  apiUrl = 'http://localhost:8080';

  constructor(public http: HttpClient) { }

  getPets(user: User): Observable<Pet[]> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.get<Pet[]>(this.apiUrl + '/user' + '/' + user.id + '/getPets', {headers});
  }

  savePet(userPet: Pet, user: User): Observable<Pet> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.post<Pet>(this.apiUrl + '/user' + '/' + user.id + '/addPet', userPet, {headers});
  }
}
