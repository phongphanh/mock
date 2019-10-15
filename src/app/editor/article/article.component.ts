import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleDetail } from 'src/app/model/article';
import { User } from 'src/app/model/user';
import { ProfileService } from 'src/app/profile/profile.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: ArticleDetail;
  curSlug: string;
  curUser: User;
  isLogin: boolean = localStorage.getItem('token') != undefined;
  
  constructor(private articleService: ArticleService, private route: ActivatedRoute, private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.curSlug = param.get('slug');
      this.articleService.articleDetail(param.get('slug'), this.isLogin).subscribe((data: ArticleDetail) => {
        this.article = data;
      });
    });

    if (this.isLogin) {
      this.profileService.getUser().subscribe((data: User) => {
        this.curUser = data;
      });
    }

    this.authService.loginEmit.subscribe((data: string) => {
      this.isLogin = data != '';
      this.profileService.getUser().subscribe((data: User) => {
        this.curUser = data;
      });
    })
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
