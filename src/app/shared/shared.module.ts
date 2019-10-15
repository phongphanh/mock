import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { SubArticleComponent } from './sub-article/sub-article.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PaginationComponent, SubArticleComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PaginationComponent,
    CommonModule,
    SubArticleComponent
  ]
})
export class SharedModule { }
