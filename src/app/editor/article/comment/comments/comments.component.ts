import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comments } from 'src/app/model/comment';
import { ProfileService } from 'src/app/profile/profile.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comments;
  @Input() curUser: User;
  @Output() delComment = new EventEmitter();

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  deleteComponent(id: number) {
    this.delComment.emit(id);
  }
}
