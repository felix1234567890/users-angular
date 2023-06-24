import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Output() sort = new EventEmitter<string>();
  @Output() perPage = new EventEmitter<number>()
  readonly options = [{ value: '', label: 'None' }, { value: 'asc', label: 'Age - ascending' }, { value: 'desc', label: 'Age - descending' }, { value: 'under40', label: 'Age - under 40' }, { value: 'over40', label: 'Age -over 40' }, { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' },];
  readonly itemsPerPage = [{ value: 3, label: '3' }, { value: 6, label: '6' }, { value: 9, label: '9' }]

  handleInput(val: typeof this.options[number]) {
    this.sort.emit(val.value);
  }
  handlePerPage(val: typeof this.itemsPerPage[number]) {
    this.perPage.emit(val.value);
  }
}
