import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileService } from '../profile.service';
import { Profile, ProfileRes } from 'src/app/model/profile';
import { ArticleService } from 'src/app/editor/article.service';
import { Articles } from 'src/app/model/articles';
import { Article } from 'src/app/model/article';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username;
  user: ProfileRes;
  lists: Article[];
  pagination = [];
  articlesCount: number;
  limit: string = '5';
  offsetIndex: number = 0;
  currentPage: number = 0;
  itemOfPage: number = Number(this.limit);
  paramUser: string;
  currentTab: string = '';
  curUserName: string = localStorage.getItem('userName');
  isSubmit: boolean = false;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private articleService: ArticleService, private titleBrown: Title) { }

  ngOnInit() {
    this.username = this.route.paramMap.subscribe((data: ParamMap) => {
      this.titleBrown.setTitle(data.get('username'));
      this.paramUser = data.get('username').replace('@', '');
      this.profileService.getProfile(this.paramUser).subscribe((data: ProfileRes) => {
        this.user = data;
      });
      this.myArticle();
    });
  }

  myArticle() {
    this.articleService.getArticleWithOtherUser(this.paramUser, this.limit, this.offsetIndex).subscribe((data: Articles) => {
      this.getDataPerPage(data);
      this.setPage();
    });
  }

  favoritedArticle() {
    this.articleService.getFavoritedArticles(this.paramUser, this.limit, this.offsetIndex).subscribe((data: Articles) => {
      this.getDataPerPage(data);
      this.setPage();
    });
  }

  getDataPerPage(data) {
    this.lists = data.articles;
    this.articlesCount = data.articlesCount;
  }

  setPage() {
    this.pagination = [];
    if (Math.ceil(this.articlesCount / Number(this.limit)) != 1) {
      for (let i = 0; i < Math.ceil(this.articlesCount / Number(this.limit)); i++) {
        this.pagination.push(i);
      }
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

  followAuthor(isFollow) {
    this.isSubmit = true;
    if (isFollow) {
      this.profileService.unFollowAuthor(this.paramUser).subscribe((data: ProfileRes) => {
        this.user = data;
        this.isSubmit = false;
      });
    } else {
      this.profileService.followAuthor(this.paramUser).subscribe((data: ProfileRes) => {
        this.user = data;
        this.isSubmit = false;
      })
    }
  }
}
