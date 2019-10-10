import { Component } from '@angular/core';
import { CommonService } from './common.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  isLogin: boolean = localStorage.getItem('token') != null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loginEmit.subscribe(res => {
      this.isLogin = res;
    })
  }
}
