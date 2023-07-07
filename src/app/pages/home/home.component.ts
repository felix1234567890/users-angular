import { Component, inject, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { UserService } from '../../../app/services/user.service';
import { CommonService } from '../../../app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  commonService = inject(CommonService);
  userService = inject(UserService);
  ngOnInit() {
    this.commonService.usersLimit$
      .pipe(
        switchMap((value) =>
          this.userService.loadUsers(this.commonService.itemsPerPage(), value)
        )
      )
      .subscribe();
    this.userService.shownUsers$.subscribe((shownUsers) => {
      this.commonService.shownUsers.set(shownUsers);
    });
  }
}
