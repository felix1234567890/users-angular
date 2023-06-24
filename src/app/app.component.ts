import { Component, signal, computed, inject, effect } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userService = inject(UserService)
  shownUsers = signal<User[]>([])
  pageNumber = signal<number>(1)
  itemsPerPage = signal<number>(3);
  usersLimit = signal<number>(60);
  users = toSignal(this.userService.sortedUsers$, { initialValue: [] })
  usersLimit$ = toObservable(this.usersLimit)
  country = signal<string>('')
  sort = signal<string>('')
  pageCount = computed(() => {
    return this.users().length / this.itemsPerPage() 
  })

constructor(){
  effect(() => {
    this.userService.loadUsers(this.itemsPerPage()).subscribe()
  })
}

  ngOnInit() {
    this.usersLimit$.pipe(switchMap(value => this.userService.loadUsers(this.itemsPerPage(),value))).subscribe()
    this.userService.shownUsers$.subscribe(shownUsers => {
      this.shownUsers.set(shownUsers)
    })
  }
  handleSearch(search: string) {
    this.country.set(search)
    if (this.sort()) return this.userService.filterUsers(search,this.itemsPerPage(), this.sort())
    return this.userService.filterUsers(search)
  }

  handleSortByAge(val: string) {
    this.sort.set(val)
    if (this.country()) return this.userService.sortUsers(val,this.itemsPerPage(), this.country())
    return this.userService.sortUsers(val)
  }
  handlePerPage(val: number) {
    if(val) this.itemsPerPage.set(val)
  }

  increaseNumber() {
    this.pageNumber.update(pageNumber => pageNumber + 1);
      this.userService.paginateData(this.itemsPerPage(), this.pageNumber());
  }

  decreaseNumber() {
    this.pageNumber.update(pageNumber => pageNumber - 1)
    this.userService.paginateData(this.itemsPerPage(), this.pageNumber());
  }
}
