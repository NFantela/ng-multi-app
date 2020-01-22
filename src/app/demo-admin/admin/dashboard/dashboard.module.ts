import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminDashboardComponent } from './containers/dashboard/dashboard.component';

import { DashboardListComponent } from './components/dashboard-list/dashboard-list.component';

// other modules

export const ROUTES: Routes = [
    {path: '', component: AdminDashboardComponent}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [AdminDashboardComponent, DashboardListComponent],
    providers: []
})
export class AdminDashboardModule {}