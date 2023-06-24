import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SelectComponent } from './components/select/select.component';
import { FiltersComponent } from './components/filters/filters.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    UserItemComponent,
    UserListComponent,
    SelectComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    HeaderComponent,
    StoreModule.forRoot(userReducer),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
