import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UserItemComponent } from './pages/user-item/user-item.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SelectComponent } from './components/select/select.component';
import { FiltersComponent } from './components/filters/filters.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CommonService } from './services/common.service';
import { FormsModule } from '@angular/forms';
import { AddFlagDirective } from './directives/add-flag.directive';
import { AppInitService } from './services/entry.service';
import { UserService } from './services/user.service';
import { CountryCodePipe } from './pipes/country-code.pipe';

function initializeApp1(appInitService: AppInitService) {
  return () => {
    return appInitService.init();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    UserItemComponent,
    UserListComponent,
    SelectComponent,
    FiltersComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HeaderComponent,
    StoreModule.forRoot(userReducer),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AddFlagDirective,
    CountryCodePipe
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp1,
      deps: [AppInitService],
      multi: true,
    },
    CommonService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
