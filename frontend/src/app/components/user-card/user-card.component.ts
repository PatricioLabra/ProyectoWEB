import { Component, Input } from '@angular/core';
import { UserInfo } from '@models/user-info.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  @Input()
  user: UserInfo = { nickname: ''};

  constructor() { }
}
