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

  followAuthor(status: boolean, username: string) {
    let url = `https://conduit.productionready.io/api/profiles/${username}/follow`;
    if (status) {
      //post
      return this.http.post(url, {}, {
        headers: this.header
      })
    } else {
      //delete
      return this.http.delete(url, {
        headers: this.header
      })
    }
  }
}
