import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArticleService } from 'src/app/editor/article.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() itemOfPage: number;
  @Input() pagination = [];
  @Input() currentPage: number;
  @Input() totalCount: number;
  @Output() putOffset = new EventEmitter();
  lastPage: number;
  firstPage = 0;

  constructor(private articleService: ArticleService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.createPagination();
  }

  ngOnInit() {
    this.lastPage = Math.ceil(this.totalCount / this.itemOfPage) - 1;
    this.createPagination();
  }

  changePage(index: number, offset: number) {
    this.putOffset.emit([index, offset]);
  }

  createPagination() {
    this.pagination = [];
    for (
      let i = this.currentPage - 2 >= 0 ? this.currentPage - 2 : 0;
      i <= (this.currentPage + 2 <= this.lastPage ? this.currentPage + 2 : this.lastPage);
      i++
    ) {
      this.pagination.push(i);
    }
  }
}
