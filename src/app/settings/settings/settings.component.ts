import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User;

  constructor(private router: Router, private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit() {
    if (this.user == undefined) {
      this.profileService.getUser().subscribe((data: User) => {
        this.user = data;
      });
    }
  }

  logOut() {
    this.authService.changeLogin(undefined, '');
  }

  onSubmit(settingsForm) {
    console.log(settingsForm);
    
  }
}
