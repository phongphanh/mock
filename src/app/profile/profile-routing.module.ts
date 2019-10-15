import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SubArticleComponent } from '../shared/sub-article/sub-article.component';


const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    children: [{
      path: 'favorites',
      component: SubArticleComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
