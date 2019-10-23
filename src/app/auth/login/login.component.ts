import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private titleBrown: Title,
    private location: Location) { }

  ngOnInit() {
    this.titleBrown.setTitle('Login');
  }

  onSubmit(loginForm) {
    if (loginForm.valid) {
      this.authService.login(loginForm.value).subscribe((data: User) => {
        console.log(data);
        
        this.error = false;
        this.authService.changeLogin(data.user.username, data.user.token, data.user.image);
        this.location.back();
      }, (error) => {
        this.error = true;
      });
    }
  }
}
