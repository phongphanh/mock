import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(loginForm) {
    if (loginForm.valid) {
      this.authService.login(loginForm.value).subscribe((data: User) => {
        this.error = false;
        this.authService.changeLogin(data.user.username, data.user.token);
      }, (error) => {
        this.error = true;
      });
    }
  }
}
