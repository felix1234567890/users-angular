import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AppInitService {
    private filePath = 'assets/users.json'
    private http = inject(HttpClient)
    init() {
        return new Promise((resolve, reject) => {
            firstValueFrom(this.http.get(this.filePath, { responseType: 'blob' })).then(res => {
                if (res) resolve(true)
                reject()
            }).catch(e => reject(e))
        })
    }
}