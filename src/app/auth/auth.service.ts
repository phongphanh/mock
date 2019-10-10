import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginEmit = new EventEmitter<any>();
  userName: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(value) {
    return this.http.post('https://conduit.productionready.io/api/users/login', {
      user: value
    });
  }

  register(value) {
    return this.http.post('https://conduit.productionready.io/api/users', {
      user: value
    });
  }

  changeLogin(userName, token) {
    if (userName) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem('token');
    }
    this.loginEmit.emit(userName);
    this.router.navigate(['/']);
  }
}
