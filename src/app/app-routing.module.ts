import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { entryGuard } from './entry.guard';
import { UserItemComponent } from './components/user-item/user-item.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [entryGuard('assets/users.json')],
    pathMatch: 'full'
  }, { path: 'user/:id', component: UserItemComponent }, 
   { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {bindToComponentInputs: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
