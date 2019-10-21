import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ArticleService } from 'src/app/editor/article.service';
import { Article, ArticleDetail } from 'src/app/model/article';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Output() selectTag = new EventEmitter();
  isLogin: boolean = localStorage.getItem('token') !== undefined;

  constructor(private articleService: ArticleService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loginEmit.subscribe((data: string) => {
      this.isLogin = data !== undefined;
    });
  }

  getTag(tag: string) {
    this.selectTag.emit(tag);
  }

  favoriteArticle(isFavorite: boolean, slug: string) {
    if (this.isLogin) {
      this.articleService.favoriteArticle(!isFavorite, slug).subscribe((data: ArticleDetail) => {
        this.article.favorited = data.article.favorited;
        this.article.favoritesCount = data.article.favoritesCount;
      })
    } else {
      this.router.navigate(['/login']);
    }
  }
}
