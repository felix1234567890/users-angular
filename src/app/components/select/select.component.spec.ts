import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';

fdescribe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize with default values', () => {
    expect(component.selected).toBe('');
    expect(component.open).toBe(false);
    });
    
    it('should toggle open value on click', () => {
    component.open = false;
    component.selected = 'Test option';
    component.open = !component.open;
    expect(component.open).toBe(true);
    });
    
    it('should set selected value on item click', () => {
    component.options = [
    { label: 'Option 1', value:'Option 1' },
    { label: 'Option 2',  value:'Option 2'  },
    { label: 'Option 3',  value:'Option 3'  }
    ];
    component.selected = component.options[1].label;
    component.onInput(component.options[1]);
    expect(component.selected).toBe('Option 2');
    });
    
    it('should set open to false on blur', () => {
    component.open = true;
    component.open = false;
    expect(component.open).toBe(false);
    });
});
