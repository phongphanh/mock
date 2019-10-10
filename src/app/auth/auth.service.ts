import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginEmit = new EventEmitter<any>();

  constructor(private http: HttpClient) {
  }

  login(value) {
    return this.http.post('https://conduit.productionready.io/api/users/login', {
      user: value
    });
  }

  register(value) {
    
  }

  changeLogin(status) {
    this.loginEmit.emit(status);
  }
}
