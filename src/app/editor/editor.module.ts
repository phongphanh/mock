import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor/editor.component';
import { ArticleComponent } from './article/article.component'


@NgModule({
  declarations: [EditorComponent, ArticleComponent],
  imports: [
    CommonModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
