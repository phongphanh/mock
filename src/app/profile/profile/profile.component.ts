import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import { Profile, ProfileRes } from 'src/app/model/profile';
import { ArticleService } from 'src/app/editor/article.service';
import { Articles } from 'src/app/model/articles';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  inputs: ['currentPage', 'itemOfPage']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private articleService: ArticleService) { }

  username;
  user: ProfileRes;
  listArticle: Article[];
  pagination = [];
  articlesCount: number;
  limit: string = '10';
  offsetIndex: number = 0;
  currentPage;
  itemOfPage;

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username");
    let paramUser = this.username.split('');
    paramUser.shift();
    paramUser = paramUser.join('');
    this.profileService.getProfile(paramUser).subscribe((data: ProfileRes) => {
      this.user = data;
    });

    this.articleService.getArticleWithOtherUser(paramUser, this.limit, this.offsetIndex).subscribe((data: Articles) =>{
      this.listArticle = data.articles;
      this.setPage();
    });

    this.articleService.getFavoritedArticles(paramUser, this.limit, this.offsetIndex).subscribe((data: Articles) => {
      this.listArticle = data.articles;
      this.setPage();
    });
  }

  setPage() {
    this.pagination = [];
    for (let i = 0; i < Math.round(this.articlesCount / Number(this.limit)); i++) {
      this.pagination.push(i);
    }
  }

  changePage(event) {
    this.currentPage = event[1];
    this.offsetIndex = event[0];
    this.articleService.getArticles(this.limit, this.offsetIndex, this.tab).subscribe((item: Articles) => {
      this.getArticlesPerPage(item);
    });
  }
}
