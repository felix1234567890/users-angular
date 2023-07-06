import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemComponent } from './user-item.component';

describe('UserItemComponent', () => {
  let component: UserItemComponent;
  let fixture: ComponentFixture<UserItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserItemComponent ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserItemComponent);
    component = fixture.componentInstance;
    // Set the user input
    component.user = {
      photo: 'path/to/photo.jpg',
      name: 'John Doe',
      email: 'johndoe@example.com',
      country: 'USA',
      gender: 'Male',
      age: 30
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user details', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img').src).toContain(component.user.photo);
    expect(compiled.querySelector('.user__name').textContent).toContain(component.user.name);
    expect(compiled.querySelector('.user__details').textContent).toContain(component.user.email);
    expect(compiled.querySelector('.user__details').textContent).toContain(component.user.country);
    expect(compiled.querySelector('.user__details').textContent).toContain(component.user.gender);
    expect(compiled.querySelector('.user__details').textContent).toContain(component.user.age);
  });
});
