import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user: User;
  header = new HttpHeaders({
    Accept: 'application/json',
    Authorization: `Token ${localStorage.getItem('token')}`
  });
  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get('https://conduit.productionready.io/api/user', {
      headers: this.header,
    })
  }

  updateProfile(value) {
    return this.http.put('https://conduit.productionready.io/api/user', {user: value}, {
      headers: this.header
    });
  }
}
