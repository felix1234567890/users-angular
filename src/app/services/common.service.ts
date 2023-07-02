import { Injectable, signal, inject, computed, effect } from "@angular/core";
import { toSignal, toObservable } from "@angular/core/rxjs-interop";
import { User, UserService } from "./user.service";
@Injectable()
export class CommonService {
    sort = signal<string>('')
    itemsPerPage = signal<number>(3);
    userService = inject(UserService)
    shownUsers = signal<User[]>([])
    pageNumber = signal<number>(1)
    usersLimit = signal<number>(60);
    users = toSignal(this.userService.sortedUsers$, { initialValue: [] })
    usersLimit$ = toObservable(this.usersLimit)
    country = signal<string>('')
    pageCount = computed(() => {
      return this.users().length / this.itemsPerPage() 
    })
  
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
    handleSearch(search: string) {
      this.country.set(search)
      if (this.sort()) return this.userService.filterUsers(search,this.itemsPerPage(), this.sort())
      return this.userService.filterUsers(search)
    }
}