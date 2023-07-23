import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { OutsideClickDirective } from './outside-click.directive';

// Dummy Component to test the directive
@Component({
  template: `<div clickOutside (clickOutside)="onOutsideClick()"></div>`
})
class TestComponent {
  onOutsideClick(): void {}
}

describe('OutsideClickDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[OutsideClickDirective],
      declarations: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.children[0];
  });

  it('should create an instance', () => {
    const directive = new OutsideClickDirective(directiveElement);
    expect(directive).toBeTruthy();
  });

  it('should not emit clickOutside event when clicked inside', () => {
    spyOn(testComponent, 'onOutsideClick');

    // Simulate a click inside the component
    directiveElement.nativeElement.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();

    expect(testComponent.onOutsideClick).not.toHaveBeenCalled();
  });
});
