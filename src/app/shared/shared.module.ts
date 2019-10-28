import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { SubArticleComponent } from './sub-article/sub-article.component';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from './sub-article/article/article.component';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PaginationComponent,
    SubArticleComponent,
    ArticleComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  exports: [
    PaginationComponent,
    CommonModule,
    SubArticleComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
