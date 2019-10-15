import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ArticleService } from 'src/app/editor/article.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() itemOfPage;
  @Input() pagination;
  @Input() currentPage;
  @Output() putOffset = new EventEmitter();

  constructor(private articleService: ArticleService) { }
  
  ngOnInit() {
  }

  changePage(index: number, offset: number){
    this.putOffset.emit([index, offset]);
  }
}
