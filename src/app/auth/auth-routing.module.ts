import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { NoNeedGuard } from './no-need.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ NoNeedGuard ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ NoNeedGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
