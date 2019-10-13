import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Article, ArticleDetail } from 'src/app/model/article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  article: Article;
  articleTitle: string = '';
  articleBody: string = '';
  articleTag: string = '';
  articleDescription: string = '';

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      if (param.get('slug') != null) {
        this.articleService.articleDetail(param.get('slug')).subscribe((data: ArticleDetail) => {
          this.articleTitle = data.article.title;
          this.articleBody = data.article.body;
          this.articleDescription = data.article.description;
          this.articleTag = data.article.tagList.join(', ');
        })
      }
    })
  }

  onSubmit(editorArticleForm) {
    if (editorArticleForm.valid) {
      this.articleService.createArticle(editorArticleForm.value).subscribe((data: ArticleDetail) => {
        this.router.navigate(['article', data.article.slug]);
      }, (error) => {
        console.log(error);
      });
    }
  }
}
