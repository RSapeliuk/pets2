import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pet} from '../models/Pet';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  apiUrl = 'http://localhost:8080';

  constructor(public http: HttpClient) {
  }

  getPets(user: User): Observable<Pet[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.get<Pet[]>(this.apiUrl + '/user' + '/' + user.id + '/getPets', {headers});
  }
  getOnePet(id: number): Observable<Pet> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.get<Pet>(this.apiUrl + '/user' + '/getPet/' + id, {headers});
  }

  savePet(userPet: Pet, user: User): Observable<Pet> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<Pet>(this.apiUrl + '/user' + '/' + user.id + '/addPet', userPet, {headers});
  }

  updatePet(pet: Pet): Observable<Pet> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.put<Pet>(this.apiUrl + '/updatePet/' + pet.id, pet, {headers});
  }
}
