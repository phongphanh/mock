import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ArticleService } from 'src/app/editor/article.service';
import { Articles } from 'src/app/model/articles';
import { TagService } from '../tag.service';
import { Tags } from 'src/app/model/tags';
import { Article } from 'src/app/model/article';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private articleService: ArticleService, private tagService: TagService, private authService: AuthService) { }

  lists: Article[];
  articlesCount: number;
  tags: string[];
  limit: string = '10';
  itemOfPage: number = Number(this.limit);
  pagination: number[] = [];
  offsetIndex: number = 0;
  currentPage: number = 0;
  checkLogin: boolean = localStorage.getItem('token') != undefined ? true : false;
  tab: string = localStorage.getItem('token') != 'null' ? 'feed' : 'global';

  ngOnInit() {
    this.authService.loginEmit.subscribe((data: string) => {
      this.checkLogin = data != '' || data != '' ? true : false;
    });

    if(!this.checkLogin){
      this.getArticleGlobal();
    }else{
      this.getArticleFeed();
    }

    this.tagService.getTags().subscribe((item: Tags) => {
      this.tags = item.tags;
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

  changeTab(tab: string) {
    this.tab = tab; 
    if (tab == 'feed') {
      this.getArticleFeed();
    } else if (tab == 'global') {
      this.getArticleGlobal();
    } else {
      this.getTag(tab);
    }
  }

  getArticleFeed() {
    this.articleService.getArticlesWithLogin(this.limit, this.offsetIndex).subscribe((item: Articles) => {
      this.getArticlesPerPage(item);
      this.setPage();
    });
  }

  getArticleGlobal() {
    this.articleService.getArticles(this.limit, this.offsetIndex, this.tag='').subscribe((item: Articles) => {
      this.getArticlesPerPage(item);
      this.setPage();
    });
  }

  getTag(param) {
    this.articleService.getArticles(this.limit, this.offsetIndex, param).subscribe((item: Articles) => {
      this.getArticlesPerPage(item);
      this.setPage();
    });
  }

  paginateResult() {
    
  }

  getArticlesPerPage(data) {
    this.lists = data.articles;
    this.articlesCount = data.articlesCount;
  }
}
