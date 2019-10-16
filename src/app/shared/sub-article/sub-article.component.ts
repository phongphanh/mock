import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sub-article',
  templateUrl: './sub-article.component.html',
  styleUrls: ['./sub-article.component.css'],
  inputs: ['listArticle', 'lists', 'articleCount']
})
export class SubArticleComponent implements OnInit {
  @Output() selectTag = new EventEmitter();
  listArticle;
  lists;

  constructor() { }

  ngOnInit() {
  }

  getTag(tag: string) {
    this.selectTag.emit(tag);
  }
}
