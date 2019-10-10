import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  checkLogin(): boolean {
    let token = localStorage.getItem('token');
    return token ? true : false;
  }
}
