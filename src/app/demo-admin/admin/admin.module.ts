import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


export const ROUTES: Routes = [
  {
    path: '',    
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: 'users',    
    loadChildren: () => import('./users/users.module').then(m => m.AdminUsersModule)
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
})
export class AdministratorModule { }