import { Component, inject } from '@angular/core';
import { CommonService } from './services/common.service';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  commonService = inject(CommonService)
  userService = inject(UserService)
  handleSearch(search: string) {
    this.commonService.country.set(search)
    if (this.commonService.sort()) return this.userService.filterUsers(search, this.commonService.itemsPerPage(), this.commonService.sort())
    return this.userService.filterUsers(search)
  }
}
