import { EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserInfoService } from '@services/user-info.service';

@Component({
  selector: 'app-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrls: ['./form-comment.component.scss']
})
export class FormCommentComponent {

  commentForm: FormGroup;

  @Output()
  onCommentSubmit = new EventEmitter();

  constructor(private _fb: FormBuilder, public currentUser: UserInfoService) {
    this.commentForm = this._fb.group({
      rating: [0],
      comment: ['']
    });
  }

  onSubmit() {
    const data = this.commentForm.getRawValue();
    const commentToSubmit = {
      comment_body: data.comment,
      nickname_author: this.currentUser.userInfo.nickname,
      calification_author: data.rating
    }

    this.onCommentSubmit.next(commentToSubmit);
    this.commentForm.reset();
  }
}
