import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { AddFlagDirective } from './add-flag.directive';

@Component({
  template: `<p appAddFlag [country]="country">{{country}}</p>`
})
class TestComponent {
  country!: string;
}

describe('AddFlagDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports:[AddFlagDirective],
      schemas:[NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.children[0];
  });

  it('should create an img element with the correct src attribute', () => {
    component.country = 'Netherlands';
    fixture.detectChanges();

    const imgElement = directiveElement.nativeElement.querySelector('img');
    const expectedSrc = 'https://flagsapi.com/NL/flat/24.png';

    expect(imgElement).toBeTruthy();
    expect(imgElement.getAttribute('src')).toBe(expectedSrc);
  });

  it('should add the "flag" class to the directive element', () => {
    component.country = 'Ireland';
    fixture.detectChanges();

    expect(directiveElement.nativeElement.classList.contains('flag')).toBe(true);
  });
});
