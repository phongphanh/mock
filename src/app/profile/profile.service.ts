import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user: User;

  constructor(private http: HttpClient) { }

  getUser() {
    let header = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    });

    return this.http.get('https://conduit.productionready.io/api/user', {
      headers: header,
    })
  }
}
