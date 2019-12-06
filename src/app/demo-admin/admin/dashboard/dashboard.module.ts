import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminDashboardComponent } from './containers/dashboard/dashboard.component';

import { SimpleTableModule } from 'lib/simple-table/simple-table.module';

// other modules

export const ROUTES: Routes = [
    {path: '', component: AdminDashboardComponent}
];

@NgModule({
    imports: [
        CommonModule,
        SimpleTableModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [AdminDashboardComponent],
    providers: []
})
export class AdminDashboardModule {}