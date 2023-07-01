import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.options = [{ value: '', label: 'None' }, { value: 'asc', label: 'Age - ascending' }, { value: 'desc', label: 'Age - descending' }, { value: 'under40', label: 'Age - under 40' }, { value: 'over40', label: 'Age -over 40' }, { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' },];
    component.open = false
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the selected option on initialization', () => {
    const spy = spyOn(component.input, 'emit');
    const selectedOption = component.options[0]; // Select the first option for testing

    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(selectedOption.label);
    expect(component.selected).toEqual(selectedOption.label);
  });

  it('should emit the selected option on input', () => {
    const spy = spyOn(component.input, 'emit');
    const {label} = component.options[1]; // Select the second option for testing

    component.onInput({label});
    expect(spy).toHaveBeenCalledWith({label});
    expect(component.selected).toEqual(label);
    expect(component.open).toBeTrue();
  });

  it('should toggle the dropdown on click', () => {
    expect(component.open).toBeFalse();

    // Click the selected div
    const selectedDiv = fixture.nativeElement.querySelector('.selected');
    selectedDiv.click();
    expect(component.open).toBeTrue();

    // Click the selected div again
    selectedDiv.click();
    expect(component.open).toBeFalse();
  });

  it('should select an option on item click', () => {
    const optionIndex = 2; // Select the third option for testing
    const selectedOption = component.options[optionIndex];

    // Open the dropdown
    component.open = true;
    fixture.detectChanges();

    // Click the third option
    const optionDiv = fixture.nativeElement.querySelectorAll('.item')[optionIndex];
    optionDiv.click();
    expect(component.selected).toEqual(selectedOption.label);
    expect(component.open).toBeFalse();
  });
});
