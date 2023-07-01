import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from '../select/select.component';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersComponent, SelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit the selected sort value', () => {
    const spy = spyOn(component.sort, 'emit');
    const selectedOption = component.options[1]; // Select the second option for testing

    component.handleInput(selectedOption);
    expect(spy).toHaveBeenCalledWith(selectedOption.value);
  });

  it('should emit the selected items per page value', () => {
    const spy = spyOn(component.perPage, 'emit');
    const selectedOption = component.itemsPerPage[2]; // Select the third option for testing

    component.handlePerPage(selectedOption);
    expect(spy).toHaveBeenCalledWith(selectedOption.value);
  });
});
