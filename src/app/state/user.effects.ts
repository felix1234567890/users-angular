import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as UserActions from './user.actions';
import { User, UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
    loadUsers$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            switchMap(() => this.userService.loadUsers()
                .pipe(
                    map((users:User[]) => UserActions.loadUsersSuccess({ users })),
                    catchError(error => of(UserActions.loadUsersFailure({ error })))
                )
            )
        )
    );

    sortUsers$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.sortUsers),
            switchMap(({ sortOrder }) => {
                return of(UserActions.sortUsers({ sortOrder }));
            })
        )
    );

    constructor(private actions$: Actions, private userService: UserService) {}
}
