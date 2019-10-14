import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/model/article';
import { User } from 'src/app/model/user';

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

  constructor() { }

  ngOnInit() {
  }

  followAuthor(status: boolean) {
    this.setFollow.emit(status);
  }

  favoriteArticle(status: boolean) {
    this.setFavorite.emit(status);
  }
}
