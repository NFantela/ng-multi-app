import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//import { reducers, effects } from '@robotiq-store/robotiq-editor';

export const ROUTES: Routes = [
  {
    path: 'demo-admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdministratorModule)
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    // StoreModule.forFeature('demoAdminStore', reducers),
    // EffectsModule.forFeature(effects),
    RouterModule.forChild(ROUTES),
  ]
}) export class DemoAdminModule { }