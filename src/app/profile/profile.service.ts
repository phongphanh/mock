import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user: User;
  header = localStorage.getItem('token') !== null ? new HttpHeaders({
    Accept: 'application/json',
    Authorization: `Token ${localStorage.getItem('token')}`
  }) : new HttpHeaders({
    Accept: 'application/json',
  });

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.loginEmit.subscribe((data: string) => {
      this.header = data !== undefined ? new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }) : new HttpHeaders({
        Accept: 'application/json',
      });
    });
  }

  getUser() {
    return this.http.get('https://conduit.productionready.io/api/user', {
      headers: this.header,
    });
  }

  updateProfile(value) {
    return this.http.put('https://conduit.productionready.io/api/user', {user: value}, {
      headers: this.header
    });
  }

  followAuthor(username: string) {
    const URL = `https://conduit.productionready.io/api/profiles/${username}/follow`;
    return this.http.post(URL, {}, {
      headers: this.header
    });
  }

  unFollowAuthor(username: string) {
    const URL = `https://conduit.productionready.io/api/profiles/${username}/follow`;
    return this.http.delete(URL, {
      headers: this.header
    });
  }

  getProfile(user) {
    return this.http.get(`https://conduit.productionready.io/api/profiles/${user}`, {
      headers: this.header
    });
  }
}
