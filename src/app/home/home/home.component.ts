import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    console.log('create');
    this.articleService.getArticles(this.limit, this.offsetIndex).subscribe((item: Articles) => {
      this.lists = item.articles;
      this.articlesCount = item.articlesCount;
      for(let i = 0; i < this.articlesCount/Number(this.limit); i++){
        this.pagination.push(i);
      }
    });

    this.tagService.getTags().subscribe((item: Tags) => {
      this.tags = item.tags;
    });
  }

  changePage(offset, index){
    this.currentPage = index;
    console.log(this.currentPage);
    this.articleService.getArticles(this.limit, offset).subscribe((item: Articles) => {
      this.lists = item.articles;
    });
  }

  getTag(param){
    this.tag = param;
  }
}
