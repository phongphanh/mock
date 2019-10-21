import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';
import { ProfileService } from 'src/app/profile/profile.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private titleBrown: Title
    ) { }

  ngOnInit() {
    this.titleBrown.setTitle('Settings');

    if (this.user === undefined) {
      this.profileService.getUser().subscribe((data: User) => {
        this.user = data;
      }, (error) => {
        this.router.navigate(['/']);
      });
    }
  }

  logOut() {
    this.authService.changeLogin(undefined, '');
  }

  onSubmit(settingsForm) {
    if (settingsForm.valid) {
      this.profileService.updateProfile(settingsForm.value).subscribe((data: User) => {
        localStorage.setItem('userName', data.user.username);
        this.authService.loginEmit.emit(data.user.username);
        this.router.navigate(['/profile']);
      })
    }
  }
}
