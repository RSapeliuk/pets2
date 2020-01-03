import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {City} from '../models/City';
import {District} from '../models/District';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public http: HttpClient,
              public apiService: ApiService) {
  }

  getCity(): Observable<City[]> {
    return this.http.get<City[]>(this.apiService.apiUrl + '/getCity');
  }

  getDistricts(): Observable<District[]> {
    return this.http.get<District[]>(this.apiService.apiUrl + '/getDistricts');
  }

  saveCity(city: City): Observable<City> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<City>(this.apiService.apiUrl + '/admin' + '/saveCity', city, {headers});
  }

  saveDistrict(id, district: District): Observable<City> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<District>(this.apiService.apiUrl + '/admin' + '/saveDistrict' + '/' + id, district, {headers});
  }
}
