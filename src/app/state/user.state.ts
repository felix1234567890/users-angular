import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../services/user.service';

export interface UserState {
users: User[];
sortedUsers: User[];
shownUsers: User[];
loading: boolean;
}

export const initialState: UserState = {
users: [],
sortedUsers: [],
shownUsers: [],
loading: false,
};

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
selectUserState,
(state: UserState) => state.users
);

export const selectSortedUsers = createSelector(
selectUserState,
(state: UserState) => state.sortedUsers
);

export const selectShownUsers = createSelector(
selectUserState,
(state: UserState) => state.shownUsers
);

export const selectLoading = createSelector(
selectUserState,
(state: UserState) => state.loading
);