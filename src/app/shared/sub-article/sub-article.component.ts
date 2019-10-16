import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-article',
  templateUrl: './sub-article.component.html',
  styleUrls: ['./sub-article.component.css'],
  inputs: ['listArticle', 'lists', 'articleCount']
})
export class SubArticleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  listArticle;
  lists;
  articleCount;
}
