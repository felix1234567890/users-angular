import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AppInitService {
  private filePath = 'assets/users.json';
  private http = inject(HttpClient);
  private userService = inject(UserService)
  init() {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.http.get(this.filePath, { responseType: 'blob' }))
        .then((res) => {
          if (res) {
            this.userService.loadUsers().subscribe()
            resolve(true)
          }
          reject();
        })
        .catch((e) => reject(e));
    });
  }
}
