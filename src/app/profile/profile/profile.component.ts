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
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private articleService: ArticleService) { }

  username;
  user: ProfileRes;
  lists: Article[];
  pagination = [];
  articlesCount: number;
  limit: string = '5';
  offsetIndex: number = 0;
  currentPage: number = 0;
  itemOfPage: number = Number(this.limit);
  paramUser;
  currentTab: string = '';

  ngOnInit() {
    this.username = this.route.paramMap.subscribe(data => {
      this.paramUser = data.get('username').split('');
      this.paramUser.shift();
      this.paramUser = this.paramUser.join('');
      this.profileService.getProfile(this.paramUser).subscribe((data: ProfileRes) => {
        this.user = data;
      });
      this.myArticle();
    });

  }

  myArticle() {
    this.articleService.getArticleWithOtherUser(this.paramUser, this.limit, this.offsetIndex).subscribe((data: Articles) => {
      this.getDataPerPage(data);
      console.log(data);
      this.setPage();
    });
  }

  favoritedArticle() {
    this.articleService.getFavoritedArticles(this.paramUser, this.limit, this.offsetIndex).subscribe((data: Articles) => {
      this.getDataPerPage(data);
      console.log(data);
      this.setPage();
    });
  }

  getDataPerPage(data) {
    this.lists = data.articles;
    this.articlesCount = data.articlesCount;
  }

  setPage() {
    this.pagination = [];
    for (let i = 0; i < Math.ceil(this.articlesCount / Number(this.limit)); i++) {
      this.pagination.push(i);
    }
  }

  changePage(event) {
    this.currentPage = event[1];
    this.offsetIndex = event[0];
    if(this.currentTab == ''){
      this.articleService.getArticleWithOtherUser(this.paramUser, this.offsetIndex, this.offsetIndex).subscribe((item: Articles) => {
        this.getDataPerPage(item);
      });
    }else{
      this.articleService.getFavoritedArticles(this.paramUser, this.limit, this.offsetIndex).subscribe((data: Articles) => {
        this.getDataPerPage(data);
      });
    }
    
  }

  changeTab(tab: string) {
    this.currentTab = tab;
    if(tab == ''){
      this.myArticle();
    }else if(tab == 'favorites'){
      this.favoritedArticle();
    }
  }
}
