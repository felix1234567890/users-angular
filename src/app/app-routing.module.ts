import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { entryGuard } from './entry.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [entryGuard('assets/users.json')],
    pathMatch:'full'
  },   { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
