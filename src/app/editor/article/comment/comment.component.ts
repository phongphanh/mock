import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../../article.service';
import { Comments, Comment } from 'src/app/model/comment';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() slug: string;
  @Input() curUser: User;
  comments: Comments;
  isLogin: boolean = localStorage.getItem('token') != undefined;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getCommnets(this.slug, this.isLogin).subscribe((res: Comments) => {
      this.comments = res;
    }, (error) => {
      console.log(error);
    })
  }

  addComment(comment: Comment) {
    this.comments.comments.unshift(comment);
  }

  delComment(id: number) {
    this.articleService.delComment(this.slug, id).subscribe((data) => {
      this.comments.comments = this.comments.comments.filter((item: Comment) => item.id != id);
    });
  }
}
