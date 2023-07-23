import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryCodePipe } from 'src/app/country-code.pipe';
import { UserItemComponent } from '../user-item/user-item.component';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CountryCodePipe],
      declarations: [ UserListComponent, UserItemComponent ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    component.users = [{
      id: 1,
      photo: 'path/to/photo.jpg',
      name: 'John Doe',
      email: 'johndoe@example.com',
      country: 'USA',
      gender: 'Male',
      age: 30
    }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
