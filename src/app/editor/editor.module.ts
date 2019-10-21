import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor/editor.component';
import { ArticleComponent } from './article/article.component'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { TagInputComponent } from './editor/tag-input/tag-input.component';

import { MarkdownModule } from 'ngx-markdown';
import { CommentComponent } from './article/comment/comment.component';
import { CommentBoxComponent } from './article/comment/comment-box/comment-box.component';
import { CommentsComponent } from './article/comment/comments/comments.component';
import { ArticleMetaComponent } from './article/article-meta/article-meta.component';

@NgModule({
  declarations: [
    EditorComponent,
    ArticleComponent,
    TagInputComponent,
    CommentComponent,
    CommentBoxComponent,
    CommentsComponent,
    ArticleMetaComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
  ]
})
export class EditorModule { }
