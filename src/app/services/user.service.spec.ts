import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('loadUsers', () => {
    it('should load users and set the subjects', () => {
      const mockUsers: User[] = [
        { age: 25, gender: 'male', country: 'USA', email: 'john@example.com', name: 'John', photo: 'john.jpg' },
        // Add more mock users as needed
      ];

      userService.loadUsers().subscribe(() => {
        expect(userService.users$).toBeTruthy();
        expect(userService.sortedUsers$).toBeTruthy();
        expect(userService.shownUsers$).toBeTruthy();
        expect(userService.loading$).toBeTruthy();

        userService.users$.subscribe((users) => {
          expect(users).toEqual(mockUsers);
        });

        userService.sortedUsers$.subscribe((sortedUsers) => {
          expect(sortedUsers).toEqual(mockUsers);
        });

        userService.shownUsers$.subscribe((shownUsers) => {
          // Assert the correct pagination logic here
        });

        userService.loading$.subscribe((loading) => {
          expect(loading).toBeFalse();
        });
      });

      const req = httpMock.expectOne('assets/users.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should handle error if request fails', () => {
      userService.loadUsers().subscribe(
        () => {
          // This should not be called
          expect(true).toBeFalse();
        },
        (error) => {
          expect(error).toBeTruthy();
        }
      );

      const req = httpMock.expectOne('assets/users.json');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('filterUsers', () => {
    it('should filter users and set the sortedUsers and shownUsers subjects', () => {
      const mockUsers: User[] = [
        { age: 25, gender: 'male', country: 'USA', email: 'john@example.com', name: 'John', photo: 'john.jpg' },
        // Add more mock users as needed
      ];
      const country = 'USA';

      userService.loadUsers().subscribe(() => {
        userService.filterUsers(country);

        userService.sortedUsers$.subscribe((sortedUsers) => {
          const filteredUsers = sortedUsers.filter((user) =>
            user.country.toLowerCase().startsWith(country.toLowerCase())
          );
          expect(sortedUsers).toEqual(filteredUsers);
        });

        userService.shownUsers$.subscribe((shownUsers) => {
          // Assert the correct pagination logic here
        });
      });

      const req = httpMock.expectOne('assets/users.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });

  describe('sortUsers', () => {
    it('should sort users and set the sortedUsers and shownUsers subjects', () => {
      const mockUsers: User[] = [
        { age: 25, gender: 'male', country: 'USA', email: 'john@example.com', name: 'John', photo: 'john.jpg' },
        // Add more mock users as needed
      ];
      const option = 'desc';
      const country = 'USA';

      userService.loadUsers().subscribe(() => {
        userService.sortUsers(option, undefined, country);

        userService.sortedUsers$.subscribe((sortedUsers) => {
          // Assert the correct sorting logic here
        });

        userService.shownUsers$.subscribe((shownUsers) => {
          // Assert the correct pagination logic here
        });
      });

      const req = httpMock.expectOne('assets/users.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });

  describe('paginateData', () => {
    it('should set the shownUsers subject with the correct pagination logic', () => {
      const mockUsers: User[] = [
        { age: 25, gender: 'male', country: 'USA', email: 'john@example.com', name: 'John', photo: 'john.jpg' },
        // Add more mock users as needed
      ];
      const itemsPerPage = 6;
      const pageNumber = 1;

      userService.loadUsers().subscribe(() => {
        userService.paginateData(itemsPerPage, pageNumber);

        userService.shownUsers$.subscribe((shownUsers) => {
          // Assert the correct pagination logic here
        });
      });

      const req = httpMock.expectOne('assets/users.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });
});
