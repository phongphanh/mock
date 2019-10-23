import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = localStorage.getItem('userName');
  isLogin: boolean = localStorage.getItem('token') !== null;
  userImg: string = localStorage.getItem('userImg');

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loginEmit.subscribe(res => {
      this.isLogin = res !== undefined;
      this.userName = res;
      this.userImg = localStorage.getItem('userImg');
    });
  }

}
