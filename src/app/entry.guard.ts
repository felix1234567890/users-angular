import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core"
import { firstValueFrom } from "rxjs";

export function entryGuard(filePath: string) {
    return async () => {
        try {
            const res = await firstValueFrom(inject(HttpClient).get(filePath, { responseType: 'blob' }))
            return !!res
        } catch (error) {
            return false
        }
    }
}