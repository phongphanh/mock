import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/model/article';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css']
})
export class ArticleMetaComponent implements OnInit {
  @Input() article: Article;
  @Input() curUser: User;
  @Input() curSlug: string;
  @Output() setFollow = new EventEmitter();
  @Output() setFavorite = new EventEmitter;
  @Input() isLogin: boolean = localStorage.getItem('token') != undefined;
  @Output() delArticle = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  followAuthor(status: boolean) {
    if (this.isLogin) {
      this.setFollow.emit(status);
    } else {
      this.navigateToLogin();
    }
  }

  favoriteArticle(status: boolean) {
    if (this.isLogin) {
      this.setFavorite.emit(status);
    } else {
      this.navigateToLogin();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  deleteArticle(slug: string) {
    this.delArticle.emit(slug);
  }
}
