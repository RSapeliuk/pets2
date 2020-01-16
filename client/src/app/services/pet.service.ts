import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pet} from '../models/Pet';
import {User} from '../models/User';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(public http: HttpClient,
              private apiService: ApiService) {
  }

  getPets(user: User): Observable<Pet[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.get<Pet[]>(this.apiService.apiUrl + '/user' + '/' + user.id + '/getPets', {headers});
  }
  getOnePet(id: number): Observable<Pet> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.get<Pet>(this.apiService.apiUrl + '/user' + '/getPet/' + id, {headers});
  }

  savePet(userPet: Pet, user: User): Observable<Pet> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<Pet>(this.apiService.apiUrl + '/user' + '/' + user.id + '/addPet', userPet, {headers});
  }

  updatePet(pet: Pet): Observable<Pet> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.put<Pet>(this.apiService.apiUrl + '/user/updatePet/' + pet.id, pet, {headers});
  }
}
