import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from 'src/app/components/filters/filters.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { SelectComponent } from 'src/app/components/select/select.component';
import { UserItemComponent } from 'src/app/components/user-item/user-item.component';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { CommonService } from 'src/app/services/common.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        HomeComponent,
        FiltersComponent,
        UserListComponent,
        UserItemComponent,
        SelectComponent,
        PaginationComponent,
      ],
      providers: [CommonService],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
