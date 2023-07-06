import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let inputElement: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      imports:[HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit search term', () => {
    spyOn(component, 'searchCountry');
    fixture.detectChanges();
    inputElement.nativeElement.value = 'Netherlands';
    inputElement.triggerEventHandler('input', { target: inputElement.nativeElement });
    fixture.detectChanges();
    expect(component.searchCountry).toHaveBeenCalled()
  });
});
