export class Comment {
  comment_body: string;
  nickname_author: string;
  calification_author: number;
  comment_date: Date;

  constructor() {
    this.comment_body = '';
    this.nickname_author = '';
    this.calification_author = 0;
    this.comment_date = new Date();
  }
}