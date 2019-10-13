import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArticleService } from 'src/app/editor/article.service';
import { Articles } from 'src/app/model/articles';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  inputs: ['currentPage', 'pagination', 'itemOfPage']
})
export class PaginationComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  itemOfPage;
  pagination;
  currentPage;

  ngOnInit() {
  }

  @Output() putOffset = new EventEmitter();

  changePage(index, offset){
    this.putOffset.emit([index, offset]);
  }
  
}
