import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { initialState, } from '../user.state';

export const userReducer = createReducer(
    initialState,
    on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
    on(UserActions.loadUsersSuccess, (state, { users }) => {
        const shuffleUsers = (arr: any[]) => {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        };
        shuffleUsers(users);
        return {
            ...state,
            users,
            sortedUsers: users,
            loading: false,
        };
    }),
    on(UserActions.loadUsersFailure, (state, { error }) => {
        console.log(error);
        return {
            ...state,
            loading: false,
        }
    }))