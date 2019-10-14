import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../../article.service';
import { Comments } from 'src/app/model/comment';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() slug: string;
  comments: Comments;
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getCommnets(this.slug).subscribe((res: Comments) => {
      console.log(res);
      this.comments = res;
    }, (error) => {
      console.log(error);
    })
  }

}
