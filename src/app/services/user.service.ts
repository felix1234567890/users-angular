import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface User {
  id:number
  age: number
  gender: string
  country: string
  email:string
  name:string
  photo:string
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private sortedUsersSubject = new BehaviorSubject<User[]>([]);
  private shownUsersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  users$ = this.usersSubject.asObservable();
  sortedUsers$ = this.sortedUsersSubject.asObservable();
  shownUsers$ = this.shownUsersSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadUsers(itemsPerPage?:number,value?:number) {
    this.loadingSubject.next(true);
    return this.http
      .get<User[]>('assets/users.json')
      .pipe(tap((users) => {
        this.shuffleUsers(users);
        this.usersSubject.next(users);
        this.sortedUsersSubject.next(users);
        this.paginateData(itemsPerPage);
        this.loadingSubject.next(false)
      }), catchError(throwError))
  }

  filterUsers(country: string,itemsPerPage?:number, sort?: any) {
    let filteredUsers
    if (sort) {
      filteredUsers = this.sortedUsersSubject.value.filter((user) => {
        return user.country.toLowerCase().startsWith(country.toLowerCase())
      });
    } else {
      filteredUsers = this.usersSubject.value.filter((user) => {
        return user.country.toLowerCase().startsWith(country.toLowerCase())
      });
    }
    filteredUsers.sort((a, b) => a?.country.localeCompare(b?.country))
    this.sortedUsersSubject.next(filteredUsers);
    this.paginateData(itemsPerPage);
  }

  sortUsers(option: string, itemsPerPage?:number, country?: string) {
    let sortedUsers;
    if (country) {
      sortedUsers = this.usersSubject.value.filter((user) => {
        return user.country.toLowerCase().startsWith(country.toLowerCase())
      });
    }
    switch (option) {
      case 'desc':
        sortedUsers = ((!country ? this.usersSubject.value : sortedUsers) as User[]).sort((a, b) => {
          return b.age - a.age;
        });
        break;
      case 'asc':
        sortedUsers = ((!country ? this.usersSubject.value : sortedUsers) as User[]).sort((a, b) => {
          return a.age - b.age;
        });
        break;
      case 'under40':
        sortedUsers = ((!country ? this.usersSubject.value : sortedUsers) as User[]).filter((user) => user.age < 40).sort((a, b) => a.age - b.age);
        break;
      case 'over40':
        sortedUsers = ((!country ? this.usersSubject.value : sortedUsers) as User[]).filter((user) => user.age > 40).sort((a, b) => a.age - b.age);
        break;
      case 'female':
        sortedUsers = ((!country ? this.usersSubject.value : sortedUsers) as User[]).filter((user) => user.gender === 'female');
        break;
      case 'male':
        sortedUsers = ((!country ? this.usersSubject.value : sortedUsers) as User[]).filter((user) => user.gender === 'male');
        break;
      default:
        sortedUsers = ((!country ? this.usersSubject.value : sortedUsers) as User[])
    }
    if (country) {
      sortedUsers = sortedUsers.filter((user) => {
        return user.country.toLowerCase().startsWith(country.toLowerCase())
      });
    }
    this.sortedUsersSubject.next(sortedUsers);
    this.paginateData(itemsPerPage);
  }

  paginateData(itemsPerPage = 6, pageNumber = 1) {
    const skip = (pageNumber - 1) * itemsPerPage;
    const sortedUsers = this.sortedUsersSubject.value;
    const shownUsers = sortedUsers.slice(skip, skip + itemsPerPage);
    this.shownUsersSubject.next(shownUsers);
  }

  private shuffleUsers(users: User[]) {
    for (let i = users.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [users[i], users[j]] = [users[j], users[i]];
    }
  }
}
