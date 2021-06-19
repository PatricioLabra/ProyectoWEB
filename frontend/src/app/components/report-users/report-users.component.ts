import { Component } from '@angular/core';
import { UserInfo } from '@models/user-info.model';
import { ApiConnectionService } from '@services/api-connection.service';

@Component({
  selector: 'app-report-users',
  templateUrl: './report-users.component.html',
  styleUrls: ['./report-users.component.scss']
})
export class ReportUsersComponent {

  users: Array<UserInfo> = [];
  quantUsers: number = 0;

  constructor(private api: ApiConnectionService) {
    this.api.getNewerUsers(0, 10).subscribe((res: any) => {
      this.users = res.data.users;
      this.quantUsers = res.data.quantityUsersRegistered;
    });
  }
}
