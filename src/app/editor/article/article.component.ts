import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleDetail } from 'src/app/model/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: ArticleDetail;
  curSlug: string;
  constructor(private articleService: ArticleService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.curSlug = param.get('slug');
      this.articleService.articleDetail(param.get('slug')).subscribe((data: ArticleDetail) => {
        this.article = data;
      });
    })
  }


}
