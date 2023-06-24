import { Component, Input } from '@angular/core';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  @Input({ required: true }) user!: User
}
