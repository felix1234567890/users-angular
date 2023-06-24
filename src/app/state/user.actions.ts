import { createAction, props } from '@ngrx/store';
import { User } from '../services/user.service';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
'[User] Load Users Success',
props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
'[User] Load Users Failure',
props<{ error: unknown }>()
);

export const filterUsers = createAction(
'[User] Filter Users',
props<{ text: string }>()
);

export const sortUsers = createAction(
'[User] Sort Users',
props<{ sortOrder: string }>()
);

export const paginateData = createAction(
'[User] Paginate Data',
props<{ pageNumber?: number, itemsPerPag?: number }>()
);

