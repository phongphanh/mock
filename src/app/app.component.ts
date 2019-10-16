import { Component } from '@angular/core';
import { CommonService } from './common.service';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  // time = setTimeout(() => {
  //   this.authService.changeLogin(undefined, '');
  // }, 10000);
  
  // constructor(private authService: AuthService, private router: Router) {}

  // resetTime() {
  //   clearTimeout(this.time);
  //   this.createTime();
  // }

  // createTime() {
  //   this.time = setTimeout(() => {
  //     this.authService.changeLogin(undefined, '');
  //     this.router.navigate(['/']);
  //   }, 10000);
  // }
}
