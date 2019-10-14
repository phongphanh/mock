import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleDetail } from 'src/app/model/article';
import { User } from 'src/app/model/user';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: ArticleDetail;
  curSlug: string;
  curUser: User;
  
  constructor(private articleService: ArticleService, private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.curSlug = param.get('slug');
      this.articleService.articleDetail(param.get('slug')).subscribe((data: ArticleDetail) => {
        this.article = data;
      });
    });

    this.profileService.getUser().subscribe((data: User) => {
      this.curUser = data;
      
    });
  }

  followAuthor(isFollow: boolean) {
    this.profileService.followAuthor(isFollow, this.article.article.author.username).subscribe((data) => {
      this.article.article.author.following = isFollow;
    })
  }

  favoriteArticle(isFavorite: boolean) {
    this.articleService.favoriteArticle(isFavorite, this.curSlug).subscribe((data) => {
      this.article.article.favorited = isFavorite;
      this.article.article.favoritesCount += isFavorite ? 1 : -1;
    })
  }
}
