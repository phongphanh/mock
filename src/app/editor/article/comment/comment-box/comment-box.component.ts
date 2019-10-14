import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/profile/profile.service';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/editor/article.service';
import { CommentRes } from 'src/app/model/comment';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  @Input() slug: string;
  @Input() curUser: User;
  @Output() addComment = new EventEmitter();
  commentForm: FormGroup;

  constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private articleService: ArticleService) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['']
    })
  }

  onSubmit() {
    if (this.commentForm.value.comment != '') {
      this.articleService.addComment(this.slug, this.commentForm.value.comment).subscribe((data: CommentRes) => {
        this.addComment.emit(data.comment);
        this.commentForm.controls.comment.setValue('');
      });
    }
  }
}
