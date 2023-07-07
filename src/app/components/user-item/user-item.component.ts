import { Component, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import {  filter, map } from 'rxjs/operators';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  @Input() id!:string

  private userService = inject(UserService)
  user$: Observable<User|undefined> = this.userService.shownUsers$.pipe(map(data=>data.find((user:User)=>user.id ===+this.id)))
}
