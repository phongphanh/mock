import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ArticleService } from 'src/app/editor/article.service';
import { Articles } from 'src/app/model/articles';
import { TagService } from '../tag.service';
import { Tags } from 'src/app/model/tags';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private articleService: ArticleService, private tagService: TagService) { }

  lists: Article[];
  articlesCount: number;
  tags;
  limit: string = '10';
  itemOfPage = Number(this.limit);
  pagination = [];
  offsetIndex = 0;
  currentPage = 0;
  tag: string;
  currentTag: string = '';

  ngOnInit() {
    console.log('create');
    this.articleService.getArticles(this.limit, this.offsetIndex, this.tag='').subscribe((item: Articles) => {
      this.lists = item.articles;
      this.articlesCount = item.articlesCount;
      this.setPage();
    });

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
    this.articleService.getArticles(this.limit, this.offsetIndex, this.tag).subscribe((item: Articles) => {
      this.lists = item.articles;
      this.articlesCount = item.articlesCount;
    });
  }

  getTag(param) {
    this.tag = param;
    this.currentTag = param;
    this.articleService.getArticles(this.limit, this.offsetIndex, this.tag).subscribe((item: Articles) => {
      this.lists = item.articles;
      this.articlesCount = item.articlesCount;
      this.setPage();
    });
  }

  changeFeed(){
    this.currentTag = '';
    this.tag = '';
    this.articleService.getArticles(this.limit, this.offsetIndex, this.tag).subscribe((item: Articles) => {
      this.lists = item.articles;
      this.articlesCount = item.articlesCount;
      this.setPage();
    });
  }
}
