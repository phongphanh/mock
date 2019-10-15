import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
// import { SubArticleComponent } from '../shared/sub-article/sub-article.component';
// import { PaginationComponent } from '../common/pagination/pagination.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ProfileModule { }
