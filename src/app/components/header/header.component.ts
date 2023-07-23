import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, filter, Subject, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { OutsideClickDirective } from '../../outside-click.directive';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, OutsideClickDirective, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchForm = new FormGroup({
    search: new FormControl(''),
  });
  private destroy$ = new Subject<void>();
  @Input({
    required: false,
    transform: (value: string) => value.toUpperCase(),
    alias: 'headerTitle',
  })
  title!: string;
  @Output() searchTerm = new EventEmitter<string>();
  clicked = false;
  search!: string;
  commonService = inject(CommonService);
  userService = inject(UserService);

  handleSearch(search: string) {
    this.commonService.country.set(search);
    if (this.commonService.sort())
      return this.userService.filterUsers(
        search,
        this.commonService.itemsPerPage(),
        this.commonService.sort()
      );
    return this.userService.filterUsers(search);
  }
  isClicked() {
    this.clicked = true;
  }
  ngOnInit(): void {
    this.searchForm.controls.search.valueChanges
      .pipe(debounceTime(500), filter(Boolean), takeUntil(this.destroy$))
      .subscribe((val) => this.handleSearch(val));
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
