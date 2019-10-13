import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ArticleComponent } from './article/article.component';


const routes: Routes = [
  {
    path: 'editor/:slug',
    component: EditorComponent,
  },
  {
    path: 'editor',
    component: EditorComponent,
  },
  {
    path: 'article/:slug',
    component: ArticleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
