import { Component, inject, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { UserService } from '../../../app/services/user.service';
import { CommonService } from '../../../app/services/common.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  {
  commonService = inject(CommonService);
  userService = inject(UserService);
  ngOnInit() {
    this.commonService.usersLimit$
      .pipe(
        switchMap(() =>
          this.userService.loadUsers(this.commonService.itemsPerPage())
        )
      )
      .subscribe()
      this.userService.shownUsers$.pipe().subscribe((shownUsers) => {
        this.commonService.shownUsers.set(shownUsers);
      });
    }
  }
