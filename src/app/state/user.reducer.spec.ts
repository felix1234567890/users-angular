import { userReducer } from './user.reducer';
import * as UserActions from './user.actions';
import { UserState, initialState } from './user.state';
import { User } from '../services/user.service';

describe('userReducer', () => {
  it('should set loading to true on loadUsers action', () => {
    const action = UserActions.loadUsers();
    const state: UserState = {
      ...initialState,
      loading: false,
    };

    const newState = userReducer(state, action);

    expect(newState.loading).toBeTrue();
  });

  it('should shuffle and set users, sortedUsers, and loading to false on loadUsersSuccess action', () => {
    const users: User[] = [
      {
        id: 1,
        name: 'User 1',
        age: 25,
        gender: 'Male',
        country: 'USA',
        email: 'user1@example.com',
        photo: 'user1.jpg',
      },
      {
        id: 2,
        name: 'User 2',
        age: 30,
        gender: 'Female',
        country: 'UK',
        email: 'user2@example.com',
        photo: 'user2.jpg',
      },
      // Add more user objects as needed
    ];
    const action = UserActions.loadUsersSuccess({ users });
    const state: UserState = {
      ...initialState,
      loading: true,
    };

    const newState = userReducer(state, action);

    expect(newState.loading).toBeFalse();
    expect(newState.users).toEqual(users);
    expect(newState.sortedUsers).toEqual(users);
  });

  it('should set loading to false on loadUsersFailure action', () => {
    const error = 'Error loading users';
    const action = UserActions.loadUsersFailure({ error });
    const state: UserState = {
      ...initialState,
      loading: true,
    };

    const newState = userReducer(state, action);

    expect(newState.loading).toBeFalse();
  });
});
