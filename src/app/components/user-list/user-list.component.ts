import { Component, Input } from '@angular/core';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users!: User[];
  loading!: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.loading$.subscribe(loading => this.loading = loading)
  }
}
