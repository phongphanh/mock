import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { Error } from 'src/app/model/error';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private titleBrown: Title,
    private location: Location) { }

  ngOnInit() {
    this.titleBrown.setTitle('Register');
  }

  onSubmit(registerForm) {
    if (registerForm.valid) {
      this.authService.register(registerForm.value).subscribe((data: User) => {
        this.error = undefined;
        this.authService.changeLogin(data.user.username, data.user.token, data.user.image);
        this.location.back();
      }, ({error: err}) => {
        this.error = `${Object.keys(err.errors)[0]} ${err.errors[Object.keys(err.errors)[0]]}`;
      });
    }
  }
}
