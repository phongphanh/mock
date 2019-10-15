import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { SharedModule } from '../shared/shared.module';
// import { PaginationComponent } from '../common/pagination/pagination.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: []
})
export class HomeModule { }
